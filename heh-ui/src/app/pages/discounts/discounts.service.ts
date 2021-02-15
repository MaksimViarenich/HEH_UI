import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  constructor(public http: HttpClient) { }

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

  getSearchDiscounts(searchData: any): any {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    const url = new URL('/odata/Discount', BASE_API_URL);
    // url.searchParams.set('searchText', searchData.searchText);
    url.searchParams.append('searchText', searchData.searchText);
    console.log(typeof(url));
    console.log(JSON.stringify(url));

    return this.http.get(JSON.stringify(url), {headers});
  }
}
