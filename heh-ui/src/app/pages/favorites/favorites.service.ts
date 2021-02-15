import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(public http: HttpClient) { }

  getFavorites(): Observable<any> {
    const token = localStorage.getItem('isAuth');

    let headers = new HttpHeaders();

    headers = headers.append('accept', 'application/json;odata.metadata=minimal;odata.streaming=true');
    headers = headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${BASE_API_URL}/api/favorites`, {headers});
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
