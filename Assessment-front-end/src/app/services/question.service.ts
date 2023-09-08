import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient) {}

  public getAssessmentQuestions(assessmentId: any) {
    return this._http.get(`${baseUrl}/question/assessment/all/${assessmentId}`);
  }

  public getSingleQuestion(questionId: any) {
    return this._http.get(`${baseUrl}/question/${questionId}`);
  }

  public addQuestion(question: any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  public updateQuestion(question: any) {
    return this._http.put(`${baseUrl}/question/`, question);
  }
}
