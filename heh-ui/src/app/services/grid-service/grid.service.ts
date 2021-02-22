import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor() {
  }

  getDiscountGrid(screenWidth: any): any {
    let breakpoint = 0;
    switch (true) {
      case screenWidth > 1200:
        breakpoint = 4;
        break;
      case (screenWidth <= 1200 && screenWidth > 800):
        breakpoint = 3;
        break;
      case (screenWidth <= 800 && screenWidth > 540):
        breakpoint = 2;
        break;
      case screenWidth <= 540:
        breakpoint = 1;
        break;
    }

    return breakpoint;
  }

  getUserGrid(screenWidth: any): any {
    let breakpoint = 0;
    switch (true) {
      case screenWidth > 1200:
        breakpoint = 3;
        break;
      case (screenWidth <= 1200 && screenWidth > 800):
        breakpoint = 2;
        break;
      case screenWidth <= 540:
        breakpoint = 1;
        break;
    }

    return breakpoint;
  }
}
