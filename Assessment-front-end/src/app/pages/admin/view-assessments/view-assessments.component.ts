import { Component, OnInit, ViewChild } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import Swal from 'sweetalert2';
import { FileServicesService } from 'src/app/services/file-services.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-view-assessments',
  templateUrl: './view-assessments.component.html',
  styleUrls: ['./view-assessments.component.css'],
})
export class ViewAssessmentsComponent implements OnInit {
  assessments: Assessment[] = []; // Replace YourAssessmentType with the actual type of your assessments
  pagedAssessments: Assessment[] = [];
  pageSize = 3; // Number of items to display per page
  pageIndex = 0; // Current page index
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private assessmentService: AssessmentService, private fileService: FileServicesService) { }
  
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
}
