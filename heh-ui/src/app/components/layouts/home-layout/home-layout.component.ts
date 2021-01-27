import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface BgImages {
  imagePath: string;
  pagePath: string;
}

interface PageTitles {
  title: string;
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
    {title: 'Discounts', pagePath: '/discounts'},
    {title: 'Favorites', pagePath: '/favorites'},
    {title: 'Profile', pagePath: '/profile'},
    {title: 'Moderator', pagePath: '/moderator/vendors'},
    {title: 'Moderator', pagePath: '/moderator/categories_tags'},
    {title: 'Admin', pagePath: '/admin/users'},
    {title: 'Admin', pagePath: '/admin/statistics'},
    {title: 'Admin', pagePath: '/admin/history'}
  ];

  constructor(private router: Router) {
    this.route = this.router.url;
    this.imagePath = '';
    this.pageTitle = '';

    this.getBackgroundImage();

    this.getTitle();
  }

  ngOnInit(): void {

  }

  getBackgroundImage(): string {
    this.route = this.router.url;
    const imgOption = this.bgImages.find(item => item.pagePath === this.route);

    return (imgOption) ? `url(${imgOption?.imagePath})` : 'none';
  }

  getTitle(): string {
    this.route = this.router.url;
    const titleOption = this.pageTitles.find(item => item.pagePath === this.route);

    return (titleOption) ? titleOption?.title : 'Unknown Page';
  }
}
