import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../../global';
import { FiltersService } from '../../../services/filter-service/filters.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(public http: HttpClient,
              private filterService: FiltersService) {}

  getUserPhotoAdmin(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

    return this.http.get(`${BASE_API_URL}/api/user/photo/${id}`, {headers, responseType: 'blob'});
  }

  getUsers(filters: any, top: number, skip: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');

    const params = this.filterService.getQueryParams(filters, top, skip);

    return this.http.get(`${BASE_API_URL}/odata/user`, {headers, params});
  }

  changeRole(userId: string, userRole: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

    return this.http.put(`${BASE_API_URL}/api/user/${userId}/${userRole}`, userRole, {headers});
  }

  changeState(userId: string, isUserActive: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

    return this.http.put(`${BASE_API_URL}/api/user/${userId}/${isUserActive}`, isUserActive, {headers});
  }
}
