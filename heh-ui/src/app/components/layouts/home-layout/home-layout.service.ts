import { Injectable } from '@angular/core';
import { PageTitle } from '../../../models/page-title';

@Injectable({
  providedIn: 'root'
})

export class HomeLayoutService {
  pageTitles: PageTitle[] = [
    {localizationKey: 'header.discounts', pagePath: '/discounts'},
    {localizationKey: 'header.favorites', pagePath: '/favorites'},
    {localizationKey: 'header.notifications', pagePath: '/notifications'},
    {localizationKey: 'header.profile', pagePath: '/profile'},
    {localizationKey: 'header.moderator', pagePath: '/moderator/vendors'},
    {localizationKey: 'header.moderator', pagePath: '/moderator/categories_tags'},
    {localizationKey: 'header.admin', pagePath: '/admin/users'},
    {localizationKey: 'header.admin', pagePath: '/admin/statistics'},
    {localizationKey: 'header.admin', pagePath: '/admin/history'}
  ];

  getPageTitles(): Array<PageTitle> {
    return this.pageTitles;
  }
}
