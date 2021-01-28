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

  imagePath = '../../../assets/img/header_menu_uk.svg';

  languages: Language[] = [
    {lang: 'English', path: '../../../assets/img/header_menu_uk.svg', langId: 0, langCode: 'en'},
    {lang: 'Русский', path: '../../../assets/img/header_menu_ru.svg', langId: 1, langCode: 'ru'}
  ];

  constructor(public translate: TranslateService) {

  }

  selectLang(path: string): void {
    this.imagePath = path;
  }
}
