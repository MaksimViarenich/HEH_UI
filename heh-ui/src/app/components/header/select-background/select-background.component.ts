import { Component, OnInit } from '@angular/core';
import { Background, SelectBackgroundService } from './select-background.service';

@Component({
  selector: 'app-select-background',
  templateUrl: './select-background.component.html',
  styleUrls: ['./select-background.component.scss']
})
export class SelectBackgroundComponent implements OnInit {

  backgrounds: Array<Background>;
  activeBackground: Background | undefined;

  constructor(private selectBackgroundServer: SelectBackgroundService) {
    this.backgrounds = selectBackgroundServer.getBackgrounds();
  }

  ngOnInit(): void {
    this.activeBackground = JSON.parse(localStorage.getItem('background') as string) || this.backgrounds[0];
    document.body.style.background = (this.activeBackground?.background as string);
    if (this.activeBackground?.isDark) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }

  changeBackground(background: Background): void {
    this.activeBackground = background;
    localStorage.setItem('background', JSON.stringify(this.activeBackground));
    document.body.style.background = background.background;
    if (background.isDark) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }
}
