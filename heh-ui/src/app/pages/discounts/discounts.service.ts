import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  constructor(public http: HttpClient) { }

getDiscounts(top: any, skip: any): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/odata/Discount?$top=${top}&$skip=${skip}`, {headers});
  }

getDiscountDetails(id: string): Observable<any> {
  const token = localStorage.getItem('isAuth');

  let headers = new HttpHeaders();

  headers = headers.append('accept', '*/*');
  headers = headers.append('Authorization', `Bearer ${token}`);

  return this.http.get(`${BASE_API_URL}/odata/Discount(${id})`, {headers});
}
}
