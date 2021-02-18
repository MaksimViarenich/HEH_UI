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

 getDiscountDetails(id: string): Observable<any> {
   const token = localStorage.getItem('isAuth');

   let headers = new HttpHeaders();

   headers = headers.append('accept', '*/*');
   headers = headers.append('Authorization', `Bearer ${token}`);

   return this.http.get(`${BASE_API_URL}/odata/Discount(${id})`, {headers});
}

  getSearchDiscounts(top?: any, skip?: any): any {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    let params = new HttpParams();
    params = params.append('$top', `${top}`);
    params = params.append('$skip', `${skip}`);
    params = params.append('$count', 'true');

    switch (true) {
      case (this.filterService.queryParams !== '') && (this.filterService.queryTextParam !== ''):

        params = params.append('$filter', this.filterService.queryParams);
        params = params.append('searchText', this.filterService.queryTextParam);

        return this.http.get(`${BASE_API_URL}/odata/Discount`, {headers, params});

      case this.filterService.queryParams !== '':
        params = params.append('$filter', this.filterService.queryParams);

        return this.http.get(`${BASE_API_URL}/odata/Discount`, {headers, params});

      case this.filterService.queryTextParam !== '':
        params = params.append('searchText', this.filterService.queryTextParam);

        return this.http.get(`${BASE_API_URL}/odata/Discount`, {headers, params});

      default:
        return this.http.get(`${BASE_API_URL}/odata/Discount`, {headers, params});
    }
  }
}
