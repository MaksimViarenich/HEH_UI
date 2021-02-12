import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public visibility = new BehaviorSubject<boolean>(false);

  constructor() {}

  getSpinner(): Observable<any> {
    return this.visibility.asObservable();
  }

  show(): void {
    this.visibility.next(true);
  }

  hide(): void {
    this.visibility.next(false);
  }
}
