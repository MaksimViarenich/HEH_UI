import { Component } from '@angular/core';

interface Language {
  lang: string;
  path: string;
  langId: number;
}

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent {

  imagePath = '../assets/images/uk-flag.png';

  languages: Language[] = [
    {lang: 'English', path: '../assets/images/uk-flag.png', langId: 0},
    {lang: 'Русский', path: '../assets/images/ru-flag.png', langId: 1}
  ];

  selectLang(e: any): void {
    this.imagePath = e.target.src;
    console.log(e.target.src);
  }
}
