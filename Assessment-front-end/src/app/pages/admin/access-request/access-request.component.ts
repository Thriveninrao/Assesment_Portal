import { Component, OnInit, ViewChild } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-access-request',
  templateUrl: './access-request.component.html',
  styleUrls: ['./access-request.component.css']
})

export class AccessRequestComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'testAttwmpted', 'actions'];
  users: User[] = []; // Initialize an empty array to hold user data
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _user: UserserviceService,
  ) { this.dataSource = new MatTableDataSource<User>([]); }
  ngOnInit(): void {
    this._user.getUserAccessRequest().subscribe(
      (data: any) => {
        //success
        this.users = data;
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

  public rejectUser(user: User) {
    console.log('Rejecting user:', user.username);
    Swal.fire({
      icon: 'warning',
      title: `Are you certain about your decision to decline ${user.firstName} ${user.lastName}'s request?`,
      confirmButtonText: 'Yes, Reject',
      confirmButtonColor: 'red',
      cancelButtonText: 'No',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this._user.rejectUserRequest(user.username).subscribe(
          (data: any) => {
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
            console.log(error);
            Swal.fire('Error', 'Error', 'error');
          }
        );
      }
    });
  }


  public approveUser(user: User) {
    console.log('Approving user:', user.username);
    Swal.fire({
      icon: 'info',
      title: `Are you certain about granting ${user.firstName} ${user.lastName} permission to log in with a new password?`,
      confirmButtonText: 'Yes',
      confirmButtonColor: 'green',
      cancelButtonText: 'No',
      cancelButtonColor: 'red',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this._user.approveUserRequest(user.username).subscribe(
          (data: any) => {
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
            console.log(error);
            Swal.fire('Error', 'Error', 'error');
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


