import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from 'src/app/services/assessment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preinstructions',
  templateUrl: './preinstructions.component.html',
  styleUrls: ['./preinstructions.component.css']
})
export class PreinstructionsComponent implements OnInit {
  assessmentId: any;
  assessmentTitle: any;
  assessment: any;
  questions: any;

  constructor(
    private _route: ActivatedRoute,
    private _assessmentService: AssessmentService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.assessmentId = this._route.snapshot.params['assessmentId'];
    this.assessmentTitle = this._route.snapshot.params['assessmentTitle'];
    console.log(this.assessmentId);
    console.log(this.assessmentTitle);
    this._assessmentService.getAssessment(this.assessmentId).subscribe(
      (data) => {
        console.log(data);
        this.assessment = data;
      },
      (error) => {
        Swal.fire('Error', 'Error in Loading Assessment Data', 'error');
      }
    );
    
  }
  startTest() {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon: 'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.value) {
        this._router.navigate([
          '/start/' + this.assessmentId + '/' + this.assessmentTitle,
        ]);
      } else if (result.dismiss) {
        Swal.fire('', '', 'info');
      }
    });
  }
}
