import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { ResultOfAssessment } from 'src/app/Interfaces/assessment.interface';
import Swal from 'sweetalert2';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-view-assessment-attended',
  templateUrl: './view-assessment-attended.component.html',
  styleUrls: ['./view-assessment-attended.component.css'],
  standalone: true,
  imports: [MatTableModule],
})
export class ViewAssessmentAttendedComponent implements OnInit {
  // assessmentId: any;
  // assessmentTitle: any;
  // resultsOftheAssesment: ResultOfAssessment[] = [];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private __AssessmentService: AssessmentService
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  // ngOnInit(): void {
  //   this.assessmentId = this._route.snapshot.params['assessmentId'];
  //   this.assessmentTitle = this._route.snapshot.params['assessmentTitle'];

  //   this.__AssessmentService.GetAttendentsAndResults(this.assessmentId).subscribe(
  //     (data) => { // Specify the type of 'data'
  //       console.log(data);
  //       this.resultsOftheAssesment = data as ResultOfAssessment[];
  //     },
  //     (error) => {
  //       console.log(error);
  //       Swal.fire(
  //         'error',
  //         `Issue in fetching Results of ${this.assessmentTitle}`,
  //         'error'
  //       );
  //     }
  //   );
  // }

   ELEMENT_DATA: ResultOfAssessment[] = [
    {
      assessmentId: 1,
      assessmentTitle: 'java',
      maxMarks: 10,
      numberOfQuestions: 5,
      obtainedMarks: 8,
      userId: 1,
      userName: 'shiva',
    },
    {
      assessmentId: 2,
      assessmentTitle: 'java',
      maxMarks: 10,
      numberOfQuestions: 5,
      obtainedMarks: 7,
      userId: 2,
      userName: 'Ram',
    },
    {
      assessmentId: 3,
      assessmentTitle: 'java',
      maxMarks: 10,
      numberOfQuestions: 5,
      obtainedMarks: 6,
      userId: 2,
      userName: 'shyam',
    },
  ];
  
  displayedColumns: string[] = ['userId', 'userName','obtainedMarks'];
  dataSource = this.ELEMENT_DATA;
}
