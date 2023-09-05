import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(private _http: HttpClient, private _category: CategoryService) {}

  // get Assessment List
  public assessments() {
    return this._http.get(`${baseUrl}/assessment/`);
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
}
