import { FiltersService } from 'src/app/services/filter-service/filters.service';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_API_URL } from '../../../global';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(public http: HttpClient,
              private filterService: FiltersService) { }

  getDiscountsStatistics(filters: any, top: number, skip: number): Observable<any> {
    const token = localStorage.getItem('isAuth');
    const params = this.filterService.getQueryParams(filters, top, skip);

    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/odata/Statistics`, {headers, params});
  }
}
