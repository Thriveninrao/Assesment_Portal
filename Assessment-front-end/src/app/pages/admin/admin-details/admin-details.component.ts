import { Component, OnInit, ViewChild } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent {
  displayedColumns: string[] = ['image', 'id', 'name', 'username', 'email', 'actions'];
  users: User[] = []; // Initialize an empty array to hold user data
  dataSource!: MatTableDataSource<User>;
  searchQuery: string = '';
  image: any;
  loggedInAdmin!: User;
  disabled=false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _user: UserserviceService, private _login: LoginService) { this.dataSource = new MatTableDataSource<User>([]); } // No need to inject a service for static data

  ngOnInit(): void {
    this._login.getCurrentUser().subscribe(
      (data:any)=>{console.log(data);
        this.loggedInAdmin=data;
      },
      (error)=>{
        console.log(error);
        alert("Error");
      }
    );

    this._user.getUsers().subscribe(
      (data: any) => {
        console.log(data);
        this.users = data;

        this.users.forEach(user => {
          if (user.username === this.loggedInAdmin.username || user.username === 'admin.admin') {
            user.disabled = true;
          } else {
            user.disabled = false;
          }
        });

        this.users = data.filter((user: User) => user.profile === 'Admin.jpg');

        console.log("users :: " + this.users);

        this.users.forEach(user => {
          console.log("users :: " + user.profile);

        });

        this.dataSource.data = this.users;
        this.dataSource.paginator = this.paginator;
        console.log(this.users);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }

  performSearch() {
    const filteredUsers = this.users.filter(user => {
      const usernameMatch = user.username.toLowerCase().includes(this.searchQuery.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const nameMatch = (user.firstName + " " + user.lastName).toLowerCase().includes(this.searchQuery.toLowerCase());
      const lastNameMatch = user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase());
      return usernameMatch || emailMatch || nameMatch || lastNameMatch;
    });
    this.dataSource.data = filteredUsers;
  }

  editUser(user: any) {
    // Implement edit logic here, e.g., set a flag or open a dialog
  }

  // Function to delete a user
  deleteUser(user: any) {

      Swal.fire({
        icon: 'warning',
        title: `Are you sure about your decision to remove ${user.firstName} ${user.lastName} ?`,
        confirmButtonText: 'Yes, Delete',
        confirmButtonColor: 'red',
        cancelButtonText: 'No',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          this._user.forceDelete(user.username).subscribe((dataOfDelete: any) => {
            console.log("Data:", dataOfDelete);
            if (dataOfDelete.message === "deleted Successfully") {
              const index = this.users.findIndex(u => u.username === user.username);
              if (index !== -1) {
                this.users.splice(index, 1);
              }
              this.dataSource.data = this.users;
              Swal.fire('Success', user.firstName + ' ' + user.lastName + ' successfully deleted', 'success');
            } else
              Swal.fire('Error', 'Error in deletion, Try again!', 'error');
          }, (error) => {
            console.log(error);
            Swal.fire('Error', 'Error', 'error');
          });
        }
      });
    }
  }

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profile: string;
  disabled: boolean;
}
