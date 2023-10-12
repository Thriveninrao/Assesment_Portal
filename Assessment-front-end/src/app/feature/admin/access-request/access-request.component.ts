import { Component, OnInit, ViewChild } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-access-request',
  templateUrl: './access-request.component.html',
  styleUrls: ['./access-request.component.scss']
})

export class AccessRequestComponent implements OnInit {
  disabled=false;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'testAttwmpted', 'actions'];
  users: User[] = []; // Initialize an empty array to hold user data
  dataSource!: MatTableDataSource<User>;
  searchQuery: string = '';
  isSubmitted:boolean = false

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _user: UserserviceService,
  ) { this.dataSource = new MatTableDataSource<User>([]); }
  ngOnInit(): void {
    this.getAcessRequest()
  }

  getAcessRequest(){
    this.isSubmitted = true;
    this._user.getUserAccessRequest().subscribe(
      (data: any) => {
        this.isSubmitted = false
        //success
        this.users = data;
        this.dataSource.data = this.users;
        this.dataSource.paginator = this.paginator;
        console.log(this.users);
      },
      (error) => {
        this.isSubmitted = false
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }

  performSearch() {
    const filteredUsers = this.users.filter(user => {
      const usernameMatch = user.username.toLowerCase().includes(this.searchQuery.toLowerCase());
      const emailMatch = user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const nameMatch = (user.firstName+" "+user.lastName).toLowerCase().includes(this.searchQuery.toLowerCase());
      const lastNameMatch = user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase());
      return usernameMatch || emailMatch || nameMatch || lastNameMatch;
    });
  
    this.dataSource.data = filteredUsers;
  }

  public rejectUser(user: User) {
    console.log('Rejecting user:', user.username);
    Swal.fire({
      icon: 'question',
      title: `Are you certain about your decision to decline ${user.firstName} ${user.lastName}'s request?`,
      confirmButtonText: 'Yes, Reject',
      confirmButtonColor: 'red',
      cancelButtonText: 'No',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.disabled=true;
        this._user.rejectUserRequest(user.username).subscribe(
          (data: any) => {
            this.isSubmitted=true;
            console.log("hi i am subscribed")
            console.log(data);
            if (data.message === "User Request successfully Rejected") {
              const index = this.users.findIndex(u => u.id === user.id);
              if (index !== -1) {
                this.users.splice(index, 1);
                this.dataSource.data = this.users; // Update the MatTableDataSource
              }
              Swal.fire('Success', data.message, 'success');
            }
          },
          (error) => {
            this.isSubmitted=true;
            console.log(error);
            Swal.fire('Error', 'Error', 'error');
          },() => {
            this.disabled = false;
          }
        );
      }
    });
  }


  public approveUser(user: User) {
    console.log('Approving user:', user.username);
    Swal.fire({
      icon: 'question',
      title: `Are you certain about granting ${user.firstName} ${user.lastName} permission to log in with a new password?`,
      confirmButtonText: 'Yes',
      confirmButtonColor: 'green',
      cancelButtonText: 'No',
      cancelButtonColor: 'red',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.disabled=true;
        this._user.approveUserRequest(user.username).subscribe(
          (data: any) => {
            this.isSubmitted=true;
            console.log("hi i am subscribed to approve")
            console.log(data);
            if (data.message === "User Request successfully Accepted") {
              const indexOfUser = this.users.indexOf(user);
              if (indexOfUser !== -1) {
                this.users.splice(indexOfUser, 1);
                this.dataSource.data = this.users;
              }
              Swal.fire('Success', data.message, 'success');
            }
          },
          (error) => {
            this.isSubmitted=true;
            console.log(error);
            Swal.fire('Error', 'Error', 'error');
          },() => {
            this.disabled = false;
          }
        );
      }
    }
    );
  }
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  testAttwmpted: boolean;
}


