import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface BgImages {
  imagePath: string;
  pagePath: string;
}

interface PageTitles {
  key: string;
  pagePath: string;
}

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  route: string;
  imagePath: string;
  pageTitle: string;

  bgImages: BgImages[] = [
    {imagePath: '../../../../assets/images/background-image/Sales_girl.png', pagePath: '/favorites'},
    {imagePath: '../../../../assets/images/background-image/boy_with_nout.png', pagePath: '/profile'},
    {imagePath: '../../../../assets/images/background-image/Man_with_pc.png', pagePath: '/admin/users'},
    {imagePath: '../../../../assets/images/background-image/Man_with_pc.png', pagePath: '/admin/statistics'},
    {imagePath: '../../../../assets/images/background-image/Man_with_pc.png', pagePath: '/admin/history'}
  ];

  pageTitles: PageTitles[] = [
    {key: 'header.discounts', pagePath: '/discounts'},
    {key: 'header.favorites', pagePath: '/favorites'},
    {key: 'header.profile', pagePath: '/profile'},
    {key: 'header.moderator', pagePath: '/moderator/vendors'},
    {key: 'header.moderator', pagePath: '/moderator/categories_tags'},
    {key: 'header.admin', pagePath: '/admin/users'},
    {key: 'header.admin', pagePath: '/admin/statistics'},
    {key: 'header.admin', pagePath: '/admin/history'}
  ];

  constructor(private router: Router) {
    this.route = this.router.url;
    this.imagePath = '';
    this.pageTitle = '';

    this.getBackgroundImage();

    this.getKey();
  }

  ngOnInit(): void {

  }

  getBackgroundImage(): string {
    this.route = this.router.url;
    const imgOption = this.bgImages.find(item => item.pagePath === this.route);

    return (imgOption) ? `url(${imgOption?.imagePath})` : 'none';
  }

  getKey(): string {
    this.route = this.router.url;
    const titleOption = this.pageTitles.find(item => item.pagePath === this.route);

    return (titleOption) ? titleOption?.key : 'Unknown Page';
  }
}
