import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {BASE_API_URL} from '../../global';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  constructor(public http: HttpClient) {
  }

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

    let locationParams = '';
    let categoryParams = '';
    let tagParams = '';
    let vendorParams = '';
    const resultParams: any = [];
    let continiusParams = '';
    if (searchData.location) {
      locationParams = `addresses/any(a: a/cityId eq ${searchData.location})`;
      resultParams.push(locationParams);
    }

    if (searchData.categories.length) {
      searchData.categories.forEach((item: string, index: number) => {
        if (searchData.categories.length - 1 === index) {
          categoryParams += `categoryId eq ${item}`;
        } else {
          categoryParams += `categoryId eq ${item} or `;
        }
      });
      resultParams.push(categoryParams);
    } else {
      categoryParams = '';
    }

    if (searchData.tags.length) {
      searchData.tags.forEach((item: string, index: number) => {
        if (searchData.tags.length - 1 === index) {
          tagParams += `tagsIds/any(t: t eq ${item})`;
        } else {
          tagParams += `tagsIds/any(t: t eq ${item}) or `;
        }
      });
      resultParams.push(tagParams);
    } else {
      tagParams = '';
    }

    if (searchData.vendors.length) {
      searchData.vendors.forEach((item: string, index: number) => {
        if (searchData.vendors.length - 1 === index) {
          vendorParams += `vendorId eq ${item}`;
        } else {
          vendorParams += `vendorId eq ${item} or `;
        }
      });
      resultParams.push(vendorParams);
    } else {
      vendorParams = '';
    }

    let params = new HttpParams();
    params = params.append('searchText', searchData.searchText || '');

    if (resultParams.length) {
      resultParams.forEach((item: string, index: number) => {
        if (resultParams.length - 1 === index) {
          continiusParams += item;
        } else {
          vendorParams += `${item} and `;
        }
      });
      params = params.append('$filter', continiusParams);
    }

    return this.http.get(`${BASE_API_URL}/odata/discount`, {headers, params});
  }
}
