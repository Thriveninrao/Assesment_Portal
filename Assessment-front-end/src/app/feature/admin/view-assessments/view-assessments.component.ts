import { Component, OnInit, ViewChild } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import Swal from 'sweetalert2';
import { FileServicesService } from 'src/app/services/file-services.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-assessments',
  templateUrl: './view-assessments.component.html',
  styleUrls: ['./view-assessments.component.scss'],
})
export class ViewAssessmentsComponent implements OnInit {
  assessments: Assessment[] = []; // Replace YourAssessmentType with the actual type of your assessments
  pagedAssessments: Assessment[] = [];
  pageSize = 3; // Number of items to display per page
  pageIndex = 0; // Current page index
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private assessmentService: AssessmentService,
    private fileService: FileServicesService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.assessmentService.assessments().subscribe(
      (data: any) => {
        this.assessments = data;
        this.pagedAssessments = this.assessments;
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
  navigateToAssessment(a:Assessment) {
    const { assessmentId, assessmentTitle } = a;
    this._router.navigate(['/admin/view-assessment-attended', assessmentId,assessmentTitle]);
  }

  test(){
    // const assessmentId = 3; // Replace with actual assessmentId
    // const userId = 7; // Replace with actual userId
    const assignId=75;
    const marksObtained = 91; // Replace with actual marksObtained
    console.log("marks are setted");
    this.fileService.setMarks(marksObtained,assignId).subscribe(
      response => {
        console.log('Marks updated successfully', response);
      },
      error => {
        console.error('Error updating marks', error);
      }
    );
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
