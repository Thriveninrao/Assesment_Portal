import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  constructor(private _http: HttpClient, private _category: CategoryService) {}

  public assessments() {
    return this._http.get(`${baseUrl}/assessment/`);
  }

  public addAssessment(assessment: any) {
    return this._http.post(`${baseUrl}/assessment/`, assessment);
  }
}
