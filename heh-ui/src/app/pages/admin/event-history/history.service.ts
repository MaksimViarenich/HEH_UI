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
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.get(`${BASE_API_URL}/odata/history?$top=${top}&$skip=${skip}&$count=true`, {headers});
  }

  getSearchHistory(filters: any, top: number, skip: number): any {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

    const params = this.filterService.getQueryParams(filters, top, skip);

    return this.http.get(`${BASE_API_URL}/odata/History`, {headers, params});
  }
}
