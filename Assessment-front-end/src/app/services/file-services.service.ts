import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileServicesService {

  constructor(private http: HttpClient) {}

  downloadXLSXFile(assessmentId:number): Observable<Blob> {
    return this.http.get(`http://localhost:9901/assessment/ExportAllQuestions/${assessmentId}`, { responseType: 'blob' });
  }
  postXLSXFile(assessmentId: number,file:File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    // Replace 'your_backend_endpoint' with the actual endpoint URL.
    return this.http.post<any>(
      `http://localhost:9901/assessment/InsertAllQuestionInAssesment/${assessmentId}`,
      formData,{headers});
}
}