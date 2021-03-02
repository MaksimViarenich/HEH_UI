import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../../global';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public http: HttpClient) {}

  getUser(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.get(`${BASE_API_URL}/api/user/profile`, {headers});
  }

  getUserPhoto(): any {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

    return this.http.get(`${BASE_API_URL}/api/user/photo`, {headers, responseType: 'blob'});
  }
}
