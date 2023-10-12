import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AssessmentFeedBack } from 'src/app/Interfaces/assessment.interface';
import { FeedbackserviceService } from 'src/app/services/feedbackservice.service';

function validateRelevancy(
  control: AbstractControl
): { [key: string]: any } | null {
  const value = control.value;
  if (value < 1 || value > 10) {
    return { invalidRelevancy: true };
  }
  return null;
}
function validateTrainerOverall(
  control: AbstractControl
): { [key: string]: any } | null {
  const value = control.value;
  if (value < 1 || value > 10) {
    return { invalidTrainerOverall: true };
  }
  return null;
}



@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  assessmentForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackserviceService
  ) {
    this.assessmentForm = this.formBuilder.group({
      relevancyToObjective: [null, [Validators.required, validateRelevancy]],
      recommendationToFellowSofttekians: ['', Validators.required],
      anyOtherAssessmentTobeAdded: [''],
      TrainerName: ['', Validators.required],
      trainerOverall: ['', Validators.required],
      rateBeforeTakingTraining: ['', Validators.required],
      rateAfterTakingTraining: ['', Validators.required],
      rateTheTrainerOnExpertise: ['', Validators.required],
      sugestions: [''],
    });
  }
  submitForm() {
    console.log(this.assessmentForm.value)
    // if (this.assessmentForm.valid) {
    //   console.log('Form submitted!', this.assessmentForm.value);

    //   const assessmentFeedback: AssessmentFeedBack = this.assessmentForm.value;

    //   // Assuming your addFeedback method returns an Observable
    //   this.feedbackService.addFeedBack(assessmentFeedback).subscribe(
    //     (response) => {
    //       console.log('Feedback saved successfully!', response);
    //       // You can do additional handling here if needed
    //     },
    //     (error) => {
    //       console.error('Error saving feedback:', error);
    //       // Handle error here
    //     }
    //   );
    // }
  }

  setValues(event:any, control:any){
    this.assessmentForm.controls[control].setValue(event)
  }
}
