import { BASE_API_URL } from '../../../global';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FiltersService } from 'src/app/services/filter-service/filters.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(public http: HttpClient, private filterService: FiltersService) {}

  getVendors(filters: any, top: number, skip: number): Observable<any> {
    const token = localStorage.getItem('isAuth');
    const params = this.filterService.getQueryParams(filters, top, skip);

    let headers = new HttpHeaders();

    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/odata/vendor`, {headers, params});
  }

  getVendorDetail(vendorId: string): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/api/vendor/${vendorId}`, {headers});
  }

  deleteVendor(id: string): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.delete(`${BASE_API_URL}/api/vendor?id=${id}`, {headers});
  }

  addVendor(newVendor: string): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);
    headers = headers.append('Content-Type', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.post(`${BASE_API_URL}/api/Vendor`, newVendor, {headers});
  }

  updateVendor(updatedVendor: any): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);
    headers = headers.append('Content-Type', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.put(`${BASE_API_URL}/api/Vendor`, updatedVendor, {headers});
  }
}
