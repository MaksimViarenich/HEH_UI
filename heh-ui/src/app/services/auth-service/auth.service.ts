import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from 'src/app/global';
import { now } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let params = new HttpParams();
    params = params.append('grant_type', 'password');
    params = params.append('username', login);
    params = params.append('password', password);
    params = params.append('client_id', 'HEHApiClient');
    params = params.append('scope', 'heh_api');

    return this.http.post(`${BASE_API_URL}/connect/token`, params, {headers});
  }

  getToken(): any {
    return localStorage.getItem('isAuth');
  }

  isAuthenticated(): any {
    const dateNow = now();
    const expDate = Number(localStorage.getItem('expDate'));

    return !!((expDate > dateNow) && localStorage.getItem('isAuth'));
  }
}
