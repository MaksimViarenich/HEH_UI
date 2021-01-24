import { Component, OnInit, ViewEncapsulation, } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationPreferences } from 'src/app/models/notification-preferences';
import { HeaderTab } from 'src/app/models/header-tab';
// import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class HeaderComponent implements OnInit {

  ngOnInit() {
  }

  user: NotificationPreferences = {
    username: 'Michael Browk',
    userphoto: '../../../assets/img/header_profile.svg',
    location: 'Belarus, Minsk'
  };


  tabs: HeaderTab[] = [
    {
      name:'Discounts',
      path: 'discounts'
    },
    {
      name:'Favorites',
      path: 'favorites'
    },
    {
      name:'Moderator',
      path: 'moderator/vendors'
    },
    {
      name:'Admin',
      path: 'admin/users'
    },
  ];

  constructor(private router: Router) { }

  goToPerson():void {
    this.router.navigate(['/profile']);
  }
  goTodiscounts():void {
    this.router.navigate(['/discounts']);
  }
  goToLogout():void {
    this.router.navigate(['/login']);
  }
}
