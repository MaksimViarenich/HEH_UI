import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(public http: HttpClient) {
  }

  getUser(): Observable<any> {

    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/api/user/profile`, {headers});
  }

  editProfile(updatedProfile: any): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);
    headers = headers.append('Content-Type', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.put(`${BASE_API_URL}api/user/profile`, updatedProfile, {headers});
  }
}
