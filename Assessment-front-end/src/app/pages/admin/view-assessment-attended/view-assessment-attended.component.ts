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
  assessmentId: any;
  assessmentTitle: any;
  ELEMENT_DATA: ResultOfAssessment[] = [];
  displayedColumns: string[] = ['userId', 'userName','obtainedMarks'];
  dataSource = new MatTableDataSource<ResultOfAssessment>(this.ELEMENT_DATA);
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private __AssessmentService: AssessmentService
  ) {{this._route.params.subscribe(params => {
    const assessmentId = params['assessmentId'];
    const assessmentTitle = params['assessmentTitle'];
    this.assessmentId = assessmentId;
    this.assessmentTitle = assessmentTitle;
  });
}}

  ngOnInit(): void {
    this.__AssessmentService.GetAttendentsAndResults(this.assessmentId).subscribe(
      (data) => {
        this.ELEMENT_DATA = data as ResultOfAssessment[];
        this.dataSource = new MatTableDataSource<ResultOfAssessment>(this.ELEMENT_DATA);
        console.log(this.dataSource);
        if (this.ELEMENT_DATA.length === 0) {
          Swal.fire(
            'Info',
            `Nobody attended this test till now`,
            'info'
          );
        }
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
