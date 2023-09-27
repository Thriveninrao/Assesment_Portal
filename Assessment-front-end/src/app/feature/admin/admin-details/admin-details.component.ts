import { Component, OnInit, ViewChild } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss']
})
export class AdminDetailsComponent {
  displayedColumns1: string[] = ['id', 'name', 'progress', 'fruit'];
  displayedColumns: string[] = ['image', 'id', 'name', 'username', 'email', 'actions'];
  admins: Admin[] = []; 
  dataSource!: MatTableDataSource<Admin>;
  searchQuery: string = '';
  image: any;
  loggedInAdmin!: Admin;
  isAdmin: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _user: UserserviceService, private _login: LoginService,private router: Router) { this.dataSource = new MatTableDataSource<Admin>([]); }

  ngOnInit(): void {
    this._login.getCurrentUser().subscribe(
      (data: any) => {
        console.log(data);
        this.loggedInAdmin = data;
        if (this.loggedInAdmin.username === 'admin.admin') {
          this.isAdmin = true;
        }

      },
      (error) => {
        console.log(error);
        alert("Error");
      }

    );

    this._user.getUsers().subscribe(
      (data: any) => {
        console.log(data);
        this.admins = data;

        const adminIndex = this.admins.findIndex(admin => admin.username === this.loggedInAdmin.username);

        if (adminIndex !== -1) {
          this.admins.splice(adminIndex, 1);
          this.admins.unshift(this.loggedInAdmin);
        }

        this.admins = data.filter((admin: Admin) => admin.profile === 'Admin.jpg' && admin.username !== 'admin.admin');

        console.log("admins :: " + this.admins);

        this.admins.forEach(admin => {
          console.log("users :: " + admin.profile);

        });

        this.dataSource.data = this.admins;
        this.dataSource.paginator = this.paginator;
        console.log(this.admins);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }

  performSearch() {
    const filteredAdmins = this.admins.filter(admin => {
      const usernameMatch = admin.username.toLowerCase().includes(this.searchQuery.toLowerCase());
      const emailMatch = admin.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const nameMatch = (admin.firstName + " " + admin.lastName).toLowerCase().includes(this.searchQuery.toLowerCase());
      const lastNameMatch = admin.lastName.toLowerCase().includes(this.searchQuery.toLowerCase());
      return usernameMatch || emailMatch || nameMatch || lastNameMatch;
    });
    this.dataSource.data = filteredAdmins;
  }

  editAdmin(admin: any) {
    const adminId = admin.id;
    this.router.navigate(['/admin/add-admin/edit',adminId], { queryParams: { mode: 'edit', adminId: adminId } });
  }
  deleteAdmin(admin: any) {
    Swal.fire({
      icon: 'question',
      title: `Are you sure about your decision to remove ${admin.firstName} ${admin.lastName} ?`,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: 'red',
      cancelButtonText: 'No',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this._user.forceDelete(admin.username).subscribe((dataOfForceDelete: any) => {
          console.log("Data:", dataOfForceDelete);
          if (dataOfForceDelete.message === "deleted Successfully") {
            const index = this.admins.findIndex(a => a.username === admin.username);
            if (index !== -1) {
              this.admins.splice(index, 1);
            }
            this.dataSource.data = this.admins;
            Swal.fire('Success', admin.firstName + ' ' + admin.lastName + ' successfully deleted', 'success');
          } else
            Swal.fire('Error', 'Error in deletion, Try again!', 'error');
        });
      }
    });
  }

}

interface Admin {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: string;
}
