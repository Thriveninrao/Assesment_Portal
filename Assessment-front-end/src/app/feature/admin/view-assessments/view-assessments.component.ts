import { Component, OnInit, ViewChild } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import Swal from 'sweetalert2';
import { FileServicesService } from 'src/app/services/file-services.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { AddAssessmentComponent } from './add-assessment/add-assessment.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateAssessmentComponent } from './update-assessment/update-assessment.component';
import { ViewAssessmentAttendedComponent } from './view-assessment-attended/view-assessment-attended.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-view-assessments',
  templateUrl: './view-assessments.component.html',
  styleUrls: ['./view-assessments.component.scss'],
})
export class ViewAssessmentsComponent implements OnInit {
  assessments: Assessment[] = []; // Replace YourAssessmentType with the actual type of your assessments
  pagedAssessments: Assessment[] = [];
  pageSize = 5; // Number of items to display per page
  pageIndex = 0; // Current page index
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  step!: number;
  currentUser: any

  constructor(
    private assessmentService: AssessmentService,
    private fileService: FileServicesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _login: LoginService,
  ) { }

  ngOnInit(): void {
    this.getCurrentLoggedInUser();
    this.getAssessments();
  }

  getCurrentLoggedInUser() {
    this._login.getCurrentUser().subscribe(
      (data) => {
        this.currentUser = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in fetching Current User')
      }
    )
  }

  getAssessments() {
    this.assessmentService.assessments().subscribe(
      (data: any) => {
        this.assessments = data;
        this.assessments = data.filter((assessment: { user: { username: any; }; }) => assessment.user.username === this.currentUser.username);
        this.pagedAssessments = this.assessments;
        this.pagedAssessments = this.assessments.slice(0, 5);
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error Loading data', 'error');
      }
    );
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedAssessments = this.assessments.slice(startIndex, endIndex);
  }

  deleteAssessment(assessmentId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure to delete this Assessment ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.assessmentService.deleteAssessment(assessmentId).subscribe(
          (data) => {
            this.pagedAssessments = this.pagedAssessments.filter(
              (test) => test.assessmentId != assessmentId
            );
            Swal.fire('Success', 'Assessment Deleted', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error in deleting', 'error');
          }
        );
      }
    });
  }

  downloadFile(assessmentId: any) {
    this.fileService.downloadXLSXFile(assessmentId).subscribe((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'QuizQuestions.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  navigateToAssessment(a: Assessment) {
    const { assessmentId, assessmentTitle } = a;
    this._router.navigate(['/admin/view-assessment-attended', assessmentId, assessmentTitle]);
  }

  test() {
    // const assessmentId = 3; // Replace with actual assessmentId
    // const userId = 7; // Replace with actual userId
    const assignId = 75;
    const marksObtained = 91; // Replace with actual marksObtained
    console.log("marks are setted");
    this.fileService.setMarks(marksObtained, assignId).subscribe(
      response => {
        console.log('Marks updated successfully', response);
      },
      error => {
        console.error('Error updating marks', error);
      }
    );
  }

  openDialog(name: string, rowData: any) {
    const dialogRef = this._dialog.open(AddAssessmentComponent, {
      data: { headerName: name, rowData: rowData }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAssessments();
    });
  }

  openUpdateAssessmentDialog(assmentId: any) {
    const dialogRef = this._dialog.open(UpdateAssessmentComponent, {
      data: { assessmentId: assmentId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAssessments();
    });
  }

  openAttempts(rowData: any) {
    const dialogRef = this._dialog.open(ViewAssessmentAttendedComponent, {
      data: { rowData: rowData }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('')
    })
  }

  onUpdate(assessmentData: any) {
    this.openDialog('Update', assessmentData)
  }

  setStep(index: number) {
    this.step = index;
  }
}

interface Assessment {
  assessmentId: number;
  assessmentTitle: string;
  assessmentDescription: string;
  maxMarks: string;
  numberOfQuestions: string;
  active: string;
  category: {
    categoryTitle: string;
  };
  user: {
    id: number;
    username: string;
    firstName: string;
  };
}
