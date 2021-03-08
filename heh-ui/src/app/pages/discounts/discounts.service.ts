import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../global';
import { FiltersService } from 'src/app/services/filter-service/filters.service';

@Injectable({
  providedIn: 'root'
})

export class DiscountsService {
  constructor(public http: HttpClient,
              private filterService: FiltersService) {}

  getDiscountDetails(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

    return this.http.get(`${BASE_API_URL}/odata/Discount(${id})`, {headers});
  }

  getSearchDiscounts(filters: any, top: number, skip: number): any {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

    const params = this.filterService.getQueryParams(filters, top, skip);

    return this.http.get(`${BASE_API_URL}/odata/Discount`, {headers, params});
  }
}
