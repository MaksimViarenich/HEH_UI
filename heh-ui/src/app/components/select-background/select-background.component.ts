import { Component, ViewEncapsulation } from '@angular/core';
import { SelectBackgroundService } from './select-background.service';
import { Background } from '../../models/background';

@Component({
  selector: 'app-select-background',
  templateUrl: './select-background.component.html',
  styleUrls: ['./select-background.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SelectBackgroundComponent {
  backgrounds: Array<Background>;
  activeBackground: Background;

  constructor(private selectBackgroundServer: SelectBackgroundService) {
    this.backgrounds = selectBackgroundServer.getBackgrounds();
    this.activeBackground = JSON.parse(localStorage.getItem('background') as string) || this.backgrounds[0];
  }

  changeBackground(background: Background): void {
    this.activeBackground = background;
    localStorage.setItem('background', JSON.stringify(this.activeBackground));
    document.body.style.background = background.background;
    this.selectBackgroundServer.changeColorTheme(background);
  }
}
