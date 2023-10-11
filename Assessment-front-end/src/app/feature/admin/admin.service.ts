import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADMIN_ENDPOINTS } from 'src/app/Common/constants/adminconstants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private _http: HttpClient
  ) { }

  public getCategories() {
    return this._http.get(ADMIN_ENDPOINTS.GET_CATEGORIES);
  }

  public getAssessments() {
    return this._http.get(ADMIN_ENDPOINTS.GET_ASSIGNMENTS);
  }
}
