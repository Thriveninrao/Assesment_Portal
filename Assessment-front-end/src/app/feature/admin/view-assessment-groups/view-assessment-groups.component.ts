import { Component, OnInit, ViewChild } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AssessmentService } from 'src/app/services/assessment.service';
import { MatDialog } from '@angular/material/dialog';
import { GroupAssessmentsComponent } from './group-assessments/group-assessments.component';

@Component({
  selector: 'app-view-assessment-groups',
  templateUrl: './view-assessment-groups.component.html',
  styleUrls: ['./view-assessment-groups.component.scss']
})
export class ViewAssessmentGroupsComponent {
  displayedColumns: string[] = ['groupId', 'groupName']; // Define the columns you want to display
  dataSource!: MatTableDataSource<any>;
  groups: any[] = [];
  assessments: any[] = [];

  constructor(
    private _assessment: AssessmentService,
    private router: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAssessments()
    this.getAssessmentGroups();

  }

  getAssessments() {
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
  }

  getAssessmentGroups() {
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

  removeGroup(group: number): void {
    this._assessment.deleteAssessmentGroups(group).subscribe((data: any) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });

  }

  addGroup(): void {
    // const queryParams = {
    //   assessments: JSON.stringify(this.assessments)
    // };
    // this.router.navigate(['/admin/group-assessments'], { queryParams });
    const dialogRef = this._dialog.open(GroupAssessmentsComponent, {
      data: {
        assessments: JSON.stringify(this.assessments)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAssessments()
      this.getAssessmentGroups();
    });
  }

  handleGroupClick(group: any) {
    // const queryParams = {
    //   groupId: JSON.stringify(group.groupId),
    //   groupName: JSON.stringify(group.groupName),
    //   assessmentList: JSON.stringify(group.assessmentList),
    //   assessments: JSON.stringify(this.assessments)
    // };
    // this.router.navigate(['/admin/group-assessments'], { queryParams });
    const dialogRef = this._dialog.open(GroupAssessmentsComponent, {
      data: {
        groupId: JSON.stringify(group.groupId),
        groupName: JSON.stringify(group.groupName),
        assessmentList: JSON.stringify(group.assessmentList),
        assessments: JSON.stringify(this.assessments)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAssessments()
      this.getAssessmentGroups();
    });
  }
}

