import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  imagePath = '../../../assets/images/header/header_menu_uk.svg';

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
    // console.log(localStorage.getItem('lang'));
    if (localStorage.getItem('lang')){
      console.log(localStorage.getItem('lang'));
      // this.translate.use(this.currentLang);
      // this.translate.setDefaultLang(this.currentLang);
    }
  }
}
