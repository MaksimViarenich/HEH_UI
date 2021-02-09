import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectBackgroundService {
  backgrounds: Array<string>;

  constructor() {
    this.backgrounds = [
      'linear-gradient(90deg, #f598a8, #f6edb2)',
      'linear-gradient(90deg, #cfecd0, #a0cea7, #9ec0db)',
      'linear-gradient(90deg, #cfecd0, #ffc5ca)',
      'linear-gradient(90deg, #b9deed, #efefef)',
      'linear-gradient(90deg, #aea4e3, #d3ffe8)',
      'linear-gradient(90deg, #69b7eb, #b3dbd3, #f4d6db)',
      'linear-gradient(limegreen, transparent), linear-gradient(90deg, skyblue, transparent), linear-gradient(-90deg, coral, transparent)',
      'linear-gradient(rgba(135, 60, 255, 0.4), rgba(135, 60, 255, 0.0) 80%), linear-gradient(-45deg, rgba(120, 155, 255, 0.9) 25%, rgba(255, 160, 65, 0.9) 75%)'
    ];
  }

  getBackgrounds(): Array<string> {
    return this.backgrounds;
  }
}
