import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationPreferences} from '../../models/notification-preferences';
import {HEADER_TABS} from '../../models/tab';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  tabs = HEADER_TABS;

  user: NotificationPreferences = {
    username: 'Michael Browk',
    userphoto: '../../../assets/img/header_profile.svg',
    location: 'Belarus, Minsk',
    address: 'Naturalistov 3',
  };

  ngOnInit() {

  }

  goToPerson(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  goToMain(): void {
    this.router.navigate(['/discounts']);
  }
}
