import { Component,OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { FeedbackserviceService } from 'src/app/services/feedbackservice.service';

@Component({
  selector: 'app-feedback-updated',
  templateUrl: './feedback-updated.component.html',
  styleUrls: ['./feedback-updated.component.css']
})
export class FeedbackUpdatedComponent implements OnInit {
  reviewForm!: FormGroup;
  constructor(private _feedbackService:FeedbackserviceService) { }
  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      rating: new FormControl(),
      objectives: new FormControl(),
      topics: new FormControl(),
      content: new FormControl(),
      trainer: new FormControl(),
      takeaways: new FormControl(),
      recommendation: new FormControl(),
      overallQuality: new FormControl()
    });
  }
  onSubmit() {
    // Submit the form data to your backend server here
    console.log("submitted");
  }

}
