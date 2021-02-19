import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../global';
import { FiltersService } from '../../services/filter-service/filters.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(public http: HttpClient,
              private filterService: FiltersService) { }

  getFavorites(filters: any, top: number, skip: number): Observable<any> {
    const token = localStorage.getItem('isAuth');
    const params = this.filterService.getQueryParams(filters, top, skip);

    let headers = new HttpHeaders();

    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/odata/favorites`, {headers, params});
  }

  deleteFavoriteCard(id: string): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.delete(`${BASE_API_URL}/api/favorites/${id}`, {headers});
  }

  addUpdateFavorite(discountId: string, note: string, type: string): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', '*/*');
    headers = headers.append('Authorization', `Bearer ${token}`);

    const body = {
      discountId,
      note
    };

    if (type === 'add') {
      return this.http.post(`${BASE_API_URL}/api/favorites`, body, {headers});
    } else {
      return this.http.put(`${BASE_API_URL}/api/favorites`, body, {headers});
    }
  }
}
