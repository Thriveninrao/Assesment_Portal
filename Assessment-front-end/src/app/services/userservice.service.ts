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
    console.log("in service add");
    
    return this.http.post(`${baseUrl}/user/create`, user);
  }

  public updateUser(user: any) {
    console.log("in service update");
    return this.http.put(`${baseUrl}/user/update`, user);
  }

  public deleteUser(username: any) {
    return this.http.delete(`${baseUrl}/user/${username}`);
  }

  public forceDelete(username: any) {
    return this.http.delete(`${baseUrl}/admin/${username}`);
  }

  //add Admin
  public addAdmin(user: any) {
    console.log("in add service");
    
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

  public getUserById(userId: number) {
    return this.http.get(`${baseUrl}/user/getUserById/${userId}`);
  }

  public getRoleId(username: string) {
    return this.http.get(`${baseUrl}/user/getRoleId/${username}`);
  }

  public assignTest(dataToSend: any) {
    console.log("in service")
    console.log(dataToSend)
    return this.http.post(`${baseUrl}/user/assignTest`, dataToSend);
  }
  public sendOTP(username: string){
    console.log(username);
    console.log(typeof(username));
    return this.http.get(`${baseUrl}/user/getOTP/${username}`);
  }

  public resetPassword(user: any){
    console.log("in ser");
    
    return this.http.put(`${baseUrl}/user/resetPassword`, user);
  }
}
