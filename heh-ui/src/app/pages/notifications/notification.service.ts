import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from 'src/app/global';
import { FiltersService } from 'src/app/services/filter-service/filters.service';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {
  constructor(
    public http: HttpClient,
    private filterService: FiltersService
  ) {}

  readNotifications(type?: string, id?: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    if (type === 'all') {
      return this.http.put(`${BASE_API_URL}/api/notification`, {headers});
    } else {
      return this.http.put(`${BASE_API_URL}/api/notification/${id}`, {headers});
    }
  }

  getSearchNotifications(filters: any, top: number, skip: number): any {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

    const params = this.filterService.getQueryParams(filters, top, skip);

    return this.http.get(`${BASE_API_URL}/odata/notification`, {headers, params});
  }
}
