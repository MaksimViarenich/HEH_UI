import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../../global';
import { FiltersService } from 'src/app/services/filter-service/filters.service';

@Injectable({
  providedIn: 'root'
})

export class VendorService {
  constructor(public http: HttpClient,
              private filterService: FiltersService) {}

  getVendors(filters: any, top: number, skip: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');

    const params = this.filterService.getQueryParams(filters, top, skip);

    return this.http.get(`${BASE_API_URL}/odata/vendor`, {headers, params});
  }

  getVendorDetail(vendorId: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.get(`${BASE_API_URL}/api/vendor/${vendorId}`, {headers});
  }

  deleteVendor(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

    return this.http.delete(`${BASE_API_URL}/api/vendor?id=${id}`, {headers});
  }

  addVendor(newVendor: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Content-Type', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.post(`${BASE_API_URL}/api/vendor`, newVendor, {headers});
  }

  updateVendor(updatedVendor: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Content-Type', 'application/json;odata.metadata=minimal;odata.streaming=true');

    return this.http.put(`${BASE_API_URL}/api/Vendor`, updatedVendor, {headers});
  }
}
