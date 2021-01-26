import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

interface BgImages {
  imagePath: string;
  pagePath: string;
}

interface PageTitles {
  title: string;
  pagePath: string;
}

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  route: string;
  imagePath: string;
  pageTitle: string;

  bgImages: BgImages[] = [
/*    {imagePath: '../../../../assets/images/background-image/Sales_girl.png', pagePath: '/favorites'},
    {imagePath: '../../../../assets/images/background-image/boy_with_nout.png', pagePath: '/profile'},*/
    {imagePath: '../../../../assets/images/background-image/Man_with_pc.png', pagePath: '/admin/users'},
    {imagePath: '../../../../assets/images/background-image/Man_with_pc.png', pagePath: '/admin/statistics'},
    {imagePath: '../../../../assets/images/background-image/Man_with_pc.png', pagePath: '/admin/history'}
  ];

  pageTitles: PageTitles[] = [
/*    {title: 'Discounts', pagePath: '/discounts'},
    {title: 'Favorites', pagePath: '/favorites'},
    {title: 'Profile', pagePath: '/profile'},*/
    {title: 'Moderator', pagePath: '/moderator/vendors'},
    {title: 'Moderator', pagePath: '/moderator/categories_tags'},
    {title: 'Admin', pagePath: '/admin/users'},
    {title: 'Admin', pagePath: '/admin/statistics'},
    {title: 'Admin', pagePath: '/admin/history'}
  ];

  constructor(private router: Router) {
    this.route = this.router.url;

    const imgOption = this.bgImages.find(item => item.pagePath === this.route);
    this.imagePath = (imgOption) ? `url(${imgOption?.imagePath})` : 'default';

    const titleOption = this.pageTitles.find(item => item.pagePath === this.route);
    this.pageTitle = (titleOption) ? titleOption?.title : 'Unknown Page';
  }

  ngOnInit(): void {

  }
}
