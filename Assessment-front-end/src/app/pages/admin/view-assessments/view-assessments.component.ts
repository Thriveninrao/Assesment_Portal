import { Component, OnInit } from '@angular/core';
import { AssessmentService } from 'src/app/services/assessment.service';
import Swal from 'sweetalert2';
import { FileServicesService } from 'src/app/services/file-services.service';

@Component({
  selector: 'app-view-assessments',
  templateUrl: './view-assessments.component.html',
  styleUrls: ['./view-assessments.component.css'],
})
export class ViewAssessmentsComponent implements OnInit {
  ngOnInit(): void {
    this.assessmentService.assessments().subscribe(
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
  constructor(private assessmentService: AssessmentService,private fileService: FileServicesService) {}
  deleteAssessment(assessmentId: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure to delete this Assessment ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      //delete
      // alert(result.value === true)
      if (result.value) {
        this.assessmentService.deleteAssessment(assessmentId).subscribe(
          (data) => {
            this.assessments = this.assessments.filter(
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
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'QuizQuestions.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  

  assessments = [
    {
      assessmentId: 23,
      assessmentTitle: 'Basic Java Assessment',
      assessmentDescription:
        'Core Java is a part of the Java programming language that one can use for developing or creating a general-purpose app.',
      maxMarks: '50',
      numberOfQuestions: '20',
      active: '',
      category: {
        categoryTitle: 'Programming',
      },
    },
    {
      assessmentId: 23,
      assessmentTitle: 'Basic Java Assessment',
      assessmentDescription:
        'Core Java is a part of the Java programming language that one can use for developing or creating a general-purpose app.',
      maxMarks: '50',
      numberOfQuestions: '20',
      active: '',
      category: {
        categoryTitle: 'Programming',
      },
    },
  ];
}
