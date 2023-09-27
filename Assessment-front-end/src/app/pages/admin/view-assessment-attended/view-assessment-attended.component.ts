import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import { ResultOfAssessment } from 'src/app/Interfaces/assessment.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-assessment-attended',
  templateUrl: './view-assessment-attended.component.html',
  styleUrls: ['./view-assessment-attended.component.css']
})
export class ViewAssessmentAttendedComponent implements OnInit{
  assessmentId: any;
  assessmentTitle: any;
  resultsOftheAssesment:ResultOfAssessment[]=[];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private __AssessmentService:AssessmentService
  ) {}
  ngOnInit(): void {
    this.assessmentId = this._route.snapshot.params['assessmentId'];
    this.assessmentTitle = this._route.snapshot.params['assessmentTitle'];

    this.__AssessmentService.GetAttendentsAndResults(this.assessmentId).subscribe(
      (data) => { // Specify the type of 'data'
        console.log(data);
        this.resultsOftheAssesment = data as ResultOfAssessment[];
      },
      (error) => {
        console.log(error);
        Swal.fire(
          'error',
          `Issue in fetching Results of ${this.assessmentTitle}`,
          'error'
        );
      }
    );
  }
}
