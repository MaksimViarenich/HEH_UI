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
export class LanguageSelectionComponent implements OnInit{

  imagePath = '../../../assets/images/header/header_menu_uk.svg';

  languages: Language[] = [
    {lang: 'English', path: '../../../assets/images/header/header_menu_uk.svg', langId: 0, langCode: 'en'},
    {lang: 'Русский', path: '../../../assets/images/header/header_menu_ru.svg', langId: 1, langCode: 'ru'}
  ];

  constructor(public translate: TranslateService, private router: Router, private route: ActivatedRoute) {}

  getUrlWithoutParams(): any{
    const urlTree: any = this.router.parseUrl(this.router.url);
    urlTree.queryParams = {};
    return (urlTree.toString());
 }

  selectLang(path: string, langCode: string): void {
    // this.translate.use(langCode);
    this.imagePath = path;
    this.router.navigate([this.getUrlWithoutParams()], {
      queryParams: {lang: langCode},
      // relativeTo: this.route
      });
  }

  changeLocalizationSubscriber(): void {
    this.route.queryParams.subscribe(params => {
      const lang = params.lang;
      this.translate.use(lang);
      // this.translate.setDefaultLang(lang);
    });
  }

  ngOnInit(): void {
    this.changeLocalizationSubscriber();
  }
}
