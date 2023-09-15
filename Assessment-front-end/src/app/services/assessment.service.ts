import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(private _http: HttpClient, private _category: CategoryService) {}

  // get Assessment List
  public assessments() {
    return this._http.get(`${baseUrl}/assessment/`);
  }

  public userAssessments(userId: any) {
    console.log("In service");
    console.log(userId);
    return this._http.get(`${baseUrl}/assessment/userAssessment/${userId}`);
  }

  // add Assessment
  public addAssessment(assessment: any) {
    return this._http.post(`${baseUrl}/assessment/`, assessment);
  }

  // delete Assessment
  public deleteAssessment(assessmentId: any) {
    console.log(assessmentId);
    return this._http.delete(`${baseUrl}/assessment/${assessmentId}`);
  }

  // get Single Assessment
  public getAssessment(assessmentId: any) {
    return this._http.get(`${baseUrl}/assessment/${assessmentId}`);
  }

  // update Assessment
  public updateAssessment(assessment: any) {
    return this._http.put(`${baseUrl}/assessment/`, assessment);
  }

  // upadte Questions List and max marks
  public updateMaxMarksAndQuestionsList(assessmentId: any) {
    return this._http.get(`${baseUrl}/assessment/question/${assessmentId}`);
  }
}
