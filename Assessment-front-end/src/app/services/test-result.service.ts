import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class TestResultService {
  constructor(private _http: HttpClient) {}

  public addTestResult(testResult: any) {
    return this._http.post(`${baseUrl}/testResult/`, testResult);
  }
}
