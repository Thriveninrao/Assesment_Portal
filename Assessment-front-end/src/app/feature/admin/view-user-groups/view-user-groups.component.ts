import { Component, OnInit, ViewChild } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GroupUsersComponent } from './group-users/group-users.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-user-groups',
  templateUrl: './view-user-groups.component.html',
  styleUrls: ['./view-user-groups.component.scss']
})

export class ViewUserGroupsComponent {

  displayedColumns: string[] = ['groupId', 'groupName']; // Define the columns you want to display
  dataSource!: MatTableDataSource<any>;
  groups: any[] = [];
  users: any[] = [];
  testUserRoleId: any;
  filteredUsers: any[] = [];


  constructor(
    private _user: UserserviceService,
    private router: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getUserGroup();
  }

  getUserData() {
    this._user.getUsers().subscribe(
      (data: any) => {
        this.users = data.map((user: any) => ({
          ...user
        }));

        this.users.forEach((user) => {
          this._user.getRoleId(user.username).subscribe((data: any) => {
            this.testUserRoleId = data;
            if (this.testUserRoleId === 44) {
              const index = this.users.indexOf(user);
              if (index !== -1) {
                this.users.splice(index, 1);
              }
            }
            this.filteredUsers = [...this.users]
          });
        });
        console.log(this.users);
      },
      (error) => {
        console.log(error)
        Swal.fire('Error !', 'Error Loading data', 'error');
      });
  }

  getUserGroup() {
    this._user.getUserGroups().subscribe(
      (data: any) => {
        console.log(data);
        this.groups = data; // Assign the data to the 'groups' array
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      });
  }

  removeGroup(index: number): void {
    // Implement logic to remove the group from the 'groups' array and make an API call to delete it from the backend
    // Update 'this.groups' accordingly
    console.log("Clicked on delete");
    console.log(index);


  }

  addGroup(): void {
    // const queryParams = {
    //   users: JSON.stringify(this.filteredUsers)
    // };
    // this.router.navigate(['/admin/group-users'], { queryParams });
    const dialogRef = this._dialog.open(GroupUsersComponent, {
      data: {
        users: JSON.stringify(this.filteredUsers)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUserData()
      this.getUserGroup();
    });
  }

  handleGroupClick(group: any) {
    // const queryParams = {
    //   groupId: JSON.stringify(group.groupId),
    //   groupName: JSON.stringify(group.groupName),
    //   userList: JSON.stringify(group.userList),
    //   users: JSON.stringify(this.filteredUsers)
    // };
    // this.router.navigate(['/admin/group-users'], { queryParams });
    const dialogRef = this._dialog.open(GroupUsersComponent, {
      data: {
        groupId: JSON.stringify(group.groupId),
        groupName: JSON.stringify(group.groupName),
        userList: JSON.stringify(group.userList),
        users: JSON.stringify(this.filteredUsers)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUserData()
      this.getUserGroup();
    });
  }
}

