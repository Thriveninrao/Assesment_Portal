import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router,ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AssessmentFeedBack } from 'src/app/Interfaces/assessment.interface';
import { FeedbackserviceService } from 'src/app/services/feedbackservice.service';





@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  assessmentForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackserviceService,
    private _snackBar:MatSnackBar,
    private _router:Router,
    private _ActivatedRoute:ActivatedRoute
  ) {
    this.assessmentForm = this.formBuilder.group({
      relevancyToObjective: [null, [Validators.required]],
      recommendationToFellowSofttekians: ['', Validators.required],
      anyOtherAssessmentTobeAdded: [''],
      trainerAssessmentOverall: ['',Validators.required],
      rateBeforetakingTraining: [''],
      rateAfterTakingTraining: [''],
      rateTheTrainerOnExpertise: [''],
      sugestions: [''],
    });
  }
  submitForm() {
    console.log(this.assessmentForm.value)
    if (this.assessmentForm.valid) {
      const assessmentFeedback: AssessmentFeedBack = this.assessmentForm.value;
      assessmentFeedback.AssessmentId= this._ActivatedRoute.snapshot.params['assessmentId'];
      this.feedbackService.addFeedBack(assessmentFeedback).subscribe(
        (response) => {
          Swal.fire('Success!','We truly value your input and will use it to improve our services. Your contribution is greatly appreciated.','success')
        },
        (error) => {
          Swal.fire('Error !', 'Error in submitting the feedback', 'error');
        }
      );
    }
    else{
      Object.values(this.assessmentForm.controls).forEach(control => {
        control.markAsTouched();
      });
  
      for (const control in this.assessmentForm.controls) {
        if (this.assessmentForm.controls[control].invalid) {
          const formControl = this.assessmentForm.controls[control];
          const labelElement = document.querySelector(`label[for=${control}]`);
          
          const label = labelElement?.textContent;
          
          if (label) {
            const errorMessage = `${label.trim()} is required.`;
            this._snackBar.open(errorMessage, 'Close', {
              duration: 3000,
              verticalPosition: 'top'
            });
          }
        }
      }
    }
    }
  

  setValues(event:any, control:any){
    this.assessmentForm.controls[control].setValue(event)
  }
  skipForm() {
    this._router.navigate(['']); 
  }
}
