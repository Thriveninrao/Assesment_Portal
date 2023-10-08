import { Component, OnInit, ViewChild } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-user-groups',
  templateUrl: './view-user-groups.component.html',
  styleUrls: ['./view-user-groups.component.css']
})

export class ViewUserGroupsComponent {

  displayedColumns: string[] = ['groupId', 'groupName']; // Define the columns you want to display
  dataSource!: MatTableDataSource<any>;
  groups: any[] = [];


  constructor(private _user: UserserviceService, private router: Router) { }

  ngOnInit(): void {
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
    // Implement logic to add a new group and make an API call to create it on the backend
    // Update 'this.groups' accordingly
  }

  handleGroupClick(group:any){
    console.log(`Clicked on Group: ${group.groupName} (ID: ${group.groupId})`);
console.log(group);

  }
}

