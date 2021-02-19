import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../global';
import { FiltersService } from 'src/app/services/filter-service/filters.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

 constructor(public http: HttpClient, private filterService: FiltersService) {}

 getDiscountDetails(id: string): Observable<any> {
   const token = localStorage.getItem('isAuth');

   let headers = new HttpHeaders();

   headers = headers.append('accept', '*/*');
   headers = headers.append('Authorization', `Bearer ${token}`);

   return this.http.get(`${BASE_API_URL}/odata/Discount(${id})`, {headers});
}

  getSearchDiscounts(filters: any, top: number, skip: number): any {
    const token = localStorage.getItem('isAuth');
    const params = this.filterService.getQueryParams(filters, top, skip);

    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/odata/Discount`, {headers, params});
  }

  getDiscountsStatistics(filters: any, top: number, skip: number): any {
    const token = localStorage.getItem('isAuth');
    const params = this.filterService.getQueryParams(filters, top, skip);

    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/odata/Statistics`, {headers, params});
  }
}
