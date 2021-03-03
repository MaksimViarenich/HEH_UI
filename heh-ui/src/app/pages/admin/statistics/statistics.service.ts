import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

import { FiltersService } from 'src/app/services/filter-service/filters.service';
import { BASE_API_URL } from '../../../global';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(public http: HttpClient,
              private filterService: FiltersService) { }

  getDiscountsStatistics(filters: any, top: number, skip: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

    const params = this.filterService.getQueryParams(filters, top, skip);

    return this.http.get(`${BASE_API_URL}/odata/Statistics`, {headers, params});
  }

  exportDiscountsStatistics(filters?: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

    const params = this.filterService.getQueryParams(filters, 0, 0, true);

    return this.http.get(`${BASE_API_URL}/odata/Statistics/Excel`, {headers, params, responseType: 'blob', observe: 'response'});
  }
}
