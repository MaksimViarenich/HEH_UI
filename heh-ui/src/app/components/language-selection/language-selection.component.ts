import { TranslateService } from '@ngx-translate/core';
import { Component, ViewEncapsulation } from '@angular/core';

interface Language {
  lang: string;
  path: string;
  langId: number;
  langCode: string;
}

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LanguageSelectionComponent {

  imagePath = '../assets/images/uk-flag.png';

  languages: Language[] = [
    {lang: 'English', path: '../assets/images/uk-flag.png', langId: 0, langCode: 'en'},
    {lang: 'Русский', path: '../assets/images/ru-flag.png', langId: 1, langCode: 'ru'}
  ];

  constructor(public translate: TranslateService) {

  }

  selectLang(path: string): void {
    this.imagePath = path;
  }
}
