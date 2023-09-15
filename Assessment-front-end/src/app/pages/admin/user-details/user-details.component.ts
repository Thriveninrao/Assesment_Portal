import { Component, OnInit, ViewChild } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  displayedColumns: string[] = ['image', 'id', 'name', 'username', 'email'];
  users: User[] = []; // Initialize an empty array to hold user data
  dataSource!: MatTableDataSource<User>;
  searchQuery: string = '';
  image: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _user: UserserviceService,) { this.dataSource = new MatTableDataSource<User>([]); } // No need to inject a service for static data

  ngOnInit(): void {
    this._user.getUsers().subscribe(
      (data: any) => {
        console.log(data);
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
    this.image = "../../../assets/Profile Pictures/User.jpg";
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
}

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}
