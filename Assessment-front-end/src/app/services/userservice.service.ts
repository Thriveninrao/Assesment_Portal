import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  constructor(private http: HttpClient, private login:LoginService) {}

  //add User
  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/create`,user)
  }

  //add Admin
  public addAdmin(user: any) {
    return this.http.post(`${baseUrl}/admin/create`,user)
  }
}
