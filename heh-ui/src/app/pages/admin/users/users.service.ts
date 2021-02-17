import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../../global';
import { FiltersService } from 'src/app/services/filter-service/filters.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(public http: HttpClient,
              private filterService: FiltersService) {}

  getUsers(): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');
    headers = headers.append('Authorization', `Bearer ${token}`);

    if (this.filterService.queryParams) {
      let params = new HttpParams();
      params = params.append('$filter', `${this.filterService.queryParams}`);

      return this.http.get(`${BASE_API_URL}/odata/user`, {headers, params});
    } else {
      return this.http.get(`${BASE_API_URL}/odata/user`, {headers});
    }
  }

  changeRole(userId: string, userRole: string): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.put(`${BASE_API_URL}/api/user/${userId}/${userRole}`, userRole, {headers});
  }

  changeState(userId: string, isUserActive: any): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.put(`${BASE_API_URL}/api/user/${userId}/${isUserActive}`, isUserActive, {headers});
  }
}
