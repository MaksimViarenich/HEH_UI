import { Component, OnInit } from '@angular/core';
import { SelectBackgroundService } from './select-background.service';

@Component({
  selector: 'app-select-background',
  templateUrl: './select-background.component.html',
  styleUrls: ['./select-background.component.scss']
})
export class SelectBackgroundComponent implements OnInit {

  backgrounds: Array<string>;
  activeBackground: string | undefined;

  constructor(private selectBackgroundServer: SelectBackgroundService) {
    this.backgrounds = selectBackgroundServer.getBackgrounds();
  }

  ngOnInit(): void {
    this.activeBackground = localStorage.getItem('background') || this.backgrounds[0];
    document.body.style.background = this.activeBackground;
    this.changeColorTheme(this.activeBackground);
  }

  changeBackground(background: string): void {
    this.activeBackground = background;
    localStorage.setItem('background', background);
    document.body.style.background = background;
    this.changeColorTheme(background);
  }

  changeColorTheme(background: string | undefined): void {
    switch (background) {
      case 'linear-gradient(90deg, #b9deed, #efefef)':
        document.body.classList.remove('pink-yellow', 'green-blue', 'purple-blue', 'green-orange', 'dark-blue', 'dark-violet', 'dark-grey', 'dark-green', 'dark-pink');
        document.body.classList.add('light-blue');
        break;
      case 'linear-gradient(90deg, rgb(245, 152, 168, 70%), rgb(246, 237, 178, 70%))':
        document.body.classList.remove('light-blue', 'green-blue', 'purple-blue', 'green-orange', 'dark-blue', 'dark-violet', 'dark-grey', 'dark-green', 'dark-pink');
        document.body.classList.add('pink-yellow');
        break;
      case 'linear-gradient(90deg, rgb(207, 236, 208, 60%), rgb(160, 206, 167, 60%), rgb(158, 192, 219, 60%))':
        document.body.classList.remove('light-blue', 'pink-yellow', 'purple-blue', 'green-orange', 'dark-blue', 'dark-violet', 'dark-grey', 'dark-green', 'dark-pink');
        document.body.classList.add('green-blue');
        break;
      case 'linear-gradient(90deg, rgb(174, 164, 227, 60%), rgb(211, 255, 232, 60%))':
        document.body.classList.remove('light-blue', 'pink-yellow', 'green-blue', 'green-orange', 'dark-blue', 'dark-violet', 'dark-grey', 'dark-green', 'dark-pink');
        document.body.classList.add('purple-blue');
        break;
      case 'linear-gradient(limegreen, transparent), linear-gradient(90deg, skyblue, transparent), linear-gradient(-90deg, coral, transparent)':
        document.body.classList.remove('light-blue', 'pink-yellow', 'green-blue', 'purple-blue', 'dark-blue', 'dark-violet', 'dark-grey', 'dark-green', 'dark-pink');
        document.body.classList.add('green-orange');
        break;
      case 'linear-gradient(315deg, #04619f 0%, #000000 74%)':
        document.body.classList.remove('light-blue', 'pink-yellow', 'green-blue', 'purple-blue', 'green-orange', 'dark-violet', 'dark-grey', 'dark-green', 'dark-pink');
        document.body.classList.add('dark-blue');
        break;
      case 'linear-gradient(315deg, #923CB5 0%, #000000 74%)':
        document.body.classList.remove('light-blue', 'pink-yellow', 'green-blue', 'purple-blue', 'green-orange', 'dark-blue', 'dark-grey', 'dark-green', 'dark-pink');
        document.body.classList.add('dark-violet');
        break;
      case 'linear-gradient(315deg, #485461 0%, #28313b 74%)':
        document.body.classList.remove('light-blue', 'pink-yellow', 'green-blue', 'purple-blue', 'green-orange', 'dark-blue', 'dark-violet', 'dark-green', 'dark-pink');
        document.body.classList.add('dark-grey');
        break;
      case 'linear-gradient(315deg, #166d3b 0%, #000000 74%)':
        document.body.classList.remove('light-blue', 'pink-yellow', 'green-blue', 'purple-blue', 'green-orange', 'dark-blue', 'dark-violet', 'dark-grey', 'dark-pink');
        document.body.classList.add('dark-green');
        break;
      case 'linear-gradient(315deg, #e84393 0%, #000000 74%)':
        document.body.classList.remove('light-blue', 'pink-yellow', 'green-blue', 'purple-blue', 'green-orange', 'dark-blue', 'dark-violet', 'dark-grey', 'dark-green');
        document.body.classList.add('dark-pink');
        break;
      default:
        document.body.classList.remove('pink-yellow', 'green-blue', 'purple-blue', 'green-orange', 'dark-blue', 'dark-violet', 'dark-grey', 'dark-green', 'dark-pink');
        document.body.classList.add('light-blue');
    }
  }
}
