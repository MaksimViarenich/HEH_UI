import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API_URL } from '../../../global';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(public http: HttpClient) { }

  getVendorsStatistics(): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/odata/statistics`, {headers});
  }
}
