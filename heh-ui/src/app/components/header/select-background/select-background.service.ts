import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectBackgroundService {
  backgrounds: Array<string>;

  constructor() {
    this.backgrounds = [
      'linear-gradient(90deg, #b9deed, #efefef)',
      'linear-gradient(90deg, rgb(245, 152, 168, 70%), rgb(246, 237, 178, 70%))',
      'linear-gradient(90deg, rgb(207, 236, 208, 60%), rgb(160, 206, 167, 60%), rgb(158, 192, 219, 60%))',
      'linear-gradient(90deg, rgb(174, 164, 227, 60%), rgb(211, 255, 232, 60%))',
      'linear-gradient(limegreen, transparent), linear-gradient(90deg, skyblue, transparent), linear-gradient(-90deg, coral, transparent)',
      'linear-gradient(315deg, #04619f 0%, #000000 74%)',
      'linear-gradient(315deg, #923CB5 0%, #000000 74%)',
      'linear-gradient(315deg, #485461 0%, #28313b 74%)',
      'linear-gradient(315deg, #166d3b 0%, #000000 74%)',
      'linear-gradient(315deg, #e84393 0%, #000000 74%)',
    ];
  }

  getBackgrounds(): Array<string> {
    return this.backgrounds;
  }
}
