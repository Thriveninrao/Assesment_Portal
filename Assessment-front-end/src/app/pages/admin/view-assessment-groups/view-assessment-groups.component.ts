import { Component, OnInit, ViewChild } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AssessmentService } from 'src/app/services/assessment.service';

@Component({
  selector: 'app-view-assessment-groups',
  templateUrl: './view-assessment-groups.component.html',
  styleUrls: ['./view-assessment-groups.component.css']
})
export class ViewAssessmentGroupsComponent {
  displayedColumns: string[] = ['groupId', 'groupName']; // Define the columns you want to display
  dataSource!: MatTableDataSource<any>;
  groups: any[] = [];
  assessments: any[]=[];

  constructor(private _assessment: AssessmentService, private router: Router) { }

  ngOnInit(): void {

    this._assessment.assessments().subscribe(
      (data: any) => {
        this.assessments = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error Loading data', 'error');
      }
    );

    this._assessment.getAssessmentGroups().subscribe(
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
    const queryParams = {
      assessments: JSON.stringify(this.assessments)
    };
    this.router.navigate(['/admin/group-assessments'], { queryParams });
  }

  handleGroupClick(group:any){
    const queryParams = {
      groupId: JSON.stringify(group.groupId),
      groupName: JSON.stringify(group.groupName),
      assessmentList: JSON.stringify(group.assessmentList),
      assessments: JSON.stringify(this.assessments)
    };
    this.router.navigate(['/admin/group-assessments'], { queryParams });
  }
}

