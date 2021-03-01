import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';

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
export class LanguageSelectionComponent implements OnInit {

  currentLang = '';
  imagePath = '';

  languages: Language[] = [
    {lang: 'English', path: '../../../assets/images/header/header_menu_uk.svg', langId: 0, langCode: 'en'},
    {lang: 'Русский', path: '../../../assets/images/header/header_menu_ru.svg', langId: 1, langCode: 'ru'}
  ];

  constructor(public translate: TranslateService) {
  }

  selectLang(path: string, langCode: string): void {
    this.translate.use(langCode);
    this.imagePath = path;
    this.currentLang = langCode;
    localStorage.setItem('lang', langCode);
  }

  ngOnInit(): void {
    const lang = localStorage.getItem('lang');

    _.forEach(this.languages, (language: any) => {
      this.imagePath = (_.isEqual(language.langCode, lang)) ?
        this.imagePath = language.path :
        '../../../assets/images/header/header_menu_uk.svg';
    });

    this.translate.setDefaultLang(lang || 'en');
  }
}
