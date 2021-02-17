import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {BASE_API_URL} from '../../global';
import {FiltersService} from 'src/app/services/filter-service/filters.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  constructor(public http: HttpClient, private filterService: FiltersService) {}

  getDiscounts(): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/odata/Discount`, {headers});
  }

  getDiscountDetails(id: string): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/odata/Discount(${id})`, {headers});
  }

  getSearchDiscounts(): any {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    if (this.filterService.queryParams && this.filterService.queryTextParam) {
      let params = new HttpParams();
      params = params.append('$filter', this.filterService.queryParams);
      params = params.append('searchText', this.filterService.queryTextParam);

      return this.http.get(`${BASE_API_URL}/odata/Discount`, {headers, params});
    }

    if (this.filterService.queryParams) {
      let params = new HttpParams();
      params = params.append('$filter', this.filterService.queryParams);

      return this.http.get(`${BASE_API_URL}/odata/Discount`, {headers, params});
    }
    if (this.filterService.queryTextParam) {
      let params = new HttpParams();
      params = params.append('searchText', this.filterService.queryTextParam);

      return this.http.get(`${BASE_API_URL}/odata/Discount`, {headers, params});
    } else {
      return this.http.get(`${BASE_API_URL}/odata/Discount`, {headers});
    }
  }
}
