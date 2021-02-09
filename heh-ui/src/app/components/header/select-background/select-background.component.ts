import { Component, OnInit } from '@angular/core';
import {SelectBackgroundService} from './select-background.service';

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
  }

  changeBackground(background: string): void {
    this.activeBackground = background;
    localStorage.setItem('background', background);
    document.body.style.background = this.activeBackground;
  }

}
