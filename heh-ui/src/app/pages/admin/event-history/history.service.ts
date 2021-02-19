import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../../global';
import { FiltersService } from 'src/app/services/filter-service/filters.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  constructor(public http: HttpClient,
              private filterService: FiltersService) {
  }

  getHistory(filters: any, top: any, skip: any): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/odata/history?$top=${top}&$skip=${skip}&$count=true`, {headers});
  }

  getSearchHistory(filters: any, top: number, skip: number): any {
    const token = localStorage.getItem('isAuth');
    const params = this.filterService.getQueryParams(filters, top, skip);

    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/odata/History`, {headers, params});
  }
}
