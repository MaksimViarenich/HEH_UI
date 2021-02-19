import { Injectable } from '@angular/core';

export interface Background {
  background: string;
  isDark?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SelectBackgroundService {
  backgrounds: Array<Background>;

  constructor() {
    this.backgrounds = [
      { background: 'linear-gradient(90deg, #f598a8, #f6edb2)'},
      { background: 'linear-gradient(90deg, #cfecd0, #a0cea7, #9ec0db)'},
      { background: 'linear-gradient(90deg, #cfecd0, #ffc5ca)'},
      { background: 'linear-gradient(90deg, #b9deed, #efefef)'},
      { background: 'linear-gradient(90deg, #aea4e3, #d3ffe8)'},
      { background: 'linear-gradient(90deg, #69b7eb, #b3dbd3, #f4d6db)'},
      { background: 'linear-gradient(limegreen, transparent), linear-gradient(90deg, skyblue, transparent), linear-gradient(-90deg, coral, transparent)'},
      { background: 'linear-gradient(rgba(135, 60, 255, 0.4), rgba(135, 60, 255, 0.0) 80%), linear-gradient(-45deg, rgba(120, 155, 255, 0.9) 25%, rgba(255, 160, 65, 0.9) 75%)'},
      { background: 'linear-gradient(147deg, #000000 0%, #04619f 74%)', isDark: true},
      { background: 'linear-gradient(147deg, #000000 0%, #923CB5 74%)', isDark: true},
      { background: 'linear-gradient(315deg, #2234ae 0%, #191714 74%)', isDark: true},
      { background: 'linear-gradient(315deg, #485461 0%, #28313b 74%)', isDark: true},
    ];
  }

  getBackgrounds(): Array<Background> {
    return this.backgrounds;
  }
}
