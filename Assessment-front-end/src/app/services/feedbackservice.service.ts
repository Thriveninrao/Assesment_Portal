import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AssessmentFeedBack } from '../Interfaces/assessment.interface';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class FeedbackserviceService {
  constructor(private _http: HttpClient) {}

  public addFeedBack(assessmentFeedback:AssessmentFeedBack) {
   return this._http.post(`${baseUrl}/addFeedback`,assessmentFeedback);
  }

  
}
