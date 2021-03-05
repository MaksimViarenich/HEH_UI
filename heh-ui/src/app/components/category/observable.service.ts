import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {
  category: string;

  storageSubject = new BehaviorSubject<string>('');
  storageChanged = this.storageSubject.asObservable();

  constructor() {
    this.category = '';
  }

  addToStorage(categoryId: string): void {
    this.category = categoryId;
    this.storageSubject.next(categoryId);
  }
}
