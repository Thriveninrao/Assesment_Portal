import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  // Current-user : Which is logged In.
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  // generate-token
  public generateToken(LoginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, LoginData);
  }

  // login user: set token in local storage
  public loginUser(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

  // isLogin: user is logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // logout : remove token from local storage.
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // Get Token
  public getToken() {
    return localStorage.getItem('token');
  }

  // Set user detail
  public setUserDetail(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Get user
  public getuserDetail() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  // get user role
  public getUserRole() {
    let user = this.getuserDetail();
    return user.authorities[0].authority;
  }
}
