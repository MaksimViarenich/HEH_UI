import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from 'src/app/global';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) {}

  getNotificationsCount(): Observable<any> {
    const token = localStorage.getItem('isAuth');
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', `Bearer ${token}`);
    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.get(`${BASE_API_URL}/api/notification/count`, {headers});
  }
}
