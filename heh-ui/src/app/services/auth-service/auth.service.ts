import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from 'src/app/global';

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

  isAuthenticated(): any {
    if (localStorage.getItem('isAuth')){
      return true;
    }

    return false;
  }
}
