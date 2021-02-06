import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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

  constructor(public translate: TranslateService) {}

  selectLang(path: string, langCode: string): void {
    this.translate.use(langCode);
    this.imagePath = path;
    this.currentLang = langCode;
    this.saveCurrentLangLocalStorage(langCode);
    }

  saveCurrentLangLocalStorage(langCode: any): void {
    localStorage.setItem('lang', langCode);
  }

  ngOnInit(): void {
    const lang = localStorage.getItem('lang');

    this.languages.forEach((language) => {
      console.log(language.path);
      if (language.langCode === lang) {
        this.imagePath = language.path;
        console.log(language);
      }
      else {
        this.imagePath = '../../../assets/images/header/header_menu_uk.svg';
      }
    });

    if (lang) {
      this.translate.setDefaultLang(lang);
    } else {
      this.translate.setDefaultLang('en');
    }
  }
}
