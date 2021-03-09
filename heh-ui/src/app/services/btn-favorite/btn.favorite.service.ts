import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class BtnFavoriteService {
    private data = new BehaviorSubject('');
    currentData = this.data.asObservable();

    updateIsFavorite(data: any): void {
        this.data.next(data);
    }
}
