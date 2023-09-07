import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileServicesService {

  constructor(private http: HttpClient) {}

  downloadXLSXFile(assessmentId:number): Observable<Blob> {
    return this.http.get(`http://localhost:9901/assessment/ExportAllQuestions/${assessmentId}`, { responseType: 'blob' });
  }
}