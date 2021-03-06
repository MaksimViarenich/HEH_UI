import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { forEach, isEqual } from 'lodash';
import { Language } from '../../../models/language';
import { LanguageService } from './language-selection.service';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LanguageSelectionComponent implements OnInit {
  currentLang = '';
  imagePath = '';

  languages: Language[] = [];

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    this.languages = languageService.getLanguages();
  }

  selectLang(path: string, langCode: string): void {
    this.translate.use(langCode);
    this.imagePath = path;
    this.currentLang = langCode;
    localStorage.setItem('lang', langCode);
  }

  ngOnInit(): void {
    const lang = localStorage.getItem('lang');

    forEach(this.languages, (language: any) => {
      this.imagePath = (isEqual(language.langCode, lang)) ?
        this.imagePath = language.path :
        '../../../assets/images/header/header_menu_uk.svg';
    });

    this.translate.setDefaultLang(lang || 'en');
  }
}
