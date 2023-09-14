import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  constructor(private http: HttpClient) { }

  //add User
  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/create`, user);
  }

  //add Admin
  public addAdmin(user: any) {
    return this.http.post(`${baseUrl}/admin/create`, user);
  }

  public getUserAccessRequest() {
    return this.http.get(`${baseUrl}/user/accessRequest`);
  }

  public rejectUserRequest(username: string) {
    return this.http.put(`${baseUrl}/user/rejectUserRequest/${username}`, null);
  }

  public approveUserRequest(username: string) {
    return this.http.put(`${baseUrl}/user/approveUserRequest/${username}`, null);
  }

  public getUsers() {
    return this.http.get(`${baseUrl}/user/getUsers`);
  }

  public getRoleId(username: string) {
    return this.http.get(`${baseUrl}/user/getRoleId/${username}`);
  }

  public assignTest(dataToSend: any) {
    console.log("in service")
    console.log(dataToSend)
    return this.http.post(`${baseUrl}/user/assignTest`, dataToSend);
  }
}
