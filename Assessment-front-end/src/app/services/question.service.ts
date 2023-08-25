import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(private _http: HttpClient) {}

  //add questions for assessments
  public addQuestions(question:any) {
    return this._http.get(`${baseUrl}/question/addQuestion`,question);
  }

  //fetch Question based on Question Id
  public fetchQuestionsById(id: number):Observable<any> {
    return this._http.get(`${baseUrl}/question/fetchQuestionById/${id}`);
  }

  //fetchAll Quetions
  public fetchAllQuestions() {
    return this._http.get(`${baseUrl}/question/fetchAllQuestions`);
  }

  //Update Question
  public updateQuestion(question:any) {
    return this._http.get(`${baseUrl}/question/updateQuestion`,question);
  }

  //fetch Questions by AssessmentId
  public fetchQuestionsByAssessmentId(id: number):Observable<any> {
    return this._http.get(`${baseUrl}/question/fetchAssessmentQuestions/${id}`);
  }

  //Delete Questions by Question ID
  public deleteQuestionById(id: number):Observable<any> {
    return this._http.get(`${baseUrl}/question/deleteQuestion/${id}`);
  }
}
