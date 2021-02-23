import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from 'src/app/global';
import { FiltersService } from 'src/app/services/filter-service/filters.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(public http: HttpClient,
              private filterService: FiltersService) {
  }

  getNotification(filters: any, top: any, skip: any): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/odata/notification?$top=${top}&$skip=${skip}&$count=true`, {headers});
  }

  getSearchNotifications(filters: any, top: number, skip: number): any {
    const token = localStorage.getItem('isAuth');
    const params = this.filterService.getQueryParams(filters, top, skip);

    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/odata/notification`, {headers, params});
  }
}

