import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface BgImages {
  imagePath: string;
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

  bgImages: BgImages[] = [
    {imagePath: '../../../../assets/images/background-image/Sales_girl.png', pagePath: '/favorites'},
    {imagePath: '../../../../assets/images/background-image/boy_with_nout.png', pagePath: '/profile'},
    {imagePath: '../../../../assets/images/background-image/Man_with_pc.png', pagePath: '/admin/users'},
    {imagePath: '../../../../assets/images/background-image/Man_with_pc.png', pagePath: '/admin/statistics'},
    {imagePath: '../../../../assets/images/background-image/Man_with_pc.png', pagePath: '/admin/history'}
  ];

  constructor(private router: Router) {
    this.route = this.router.url;
    const imgOption = this.bgImages.find(item => item.pagePath === this.route);
    this.imagePath = (imgOption) ? `url(${imgOption?.imagePath})` : 'default';
    console.log(this.imagePath);
  }

  ngOnInit(): void {

  }
}
