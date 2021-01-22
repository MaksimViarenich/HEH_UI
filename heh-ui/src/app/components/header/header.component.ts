import { Component, OnInit, ViewEncapsulation, } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationPreferences } from 'src/app/models/notification-preferences';
import { UserProfileButtons } from 'src/app/models/notification-preferences';
import { HeaderTab } from 'src/app/models/notification-preferences';


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

  button: UserProfileButtons = {
    buttonsnameProfile: 'Profile',
    buttonsphotoProfile: '../../../assets/img/header_menu_profile.svg',

    buttonsnameLogout: 'Logout',
    buttonsphotoLogout: '../../../assets/img/header_menu_logout.svg'
  };


  tab: HeaderTab[] = [
    { discounts: 'Discounts',favorites: 'Favorites',moderator: 'Moderator',admin: 'Admin' },
  ];

  // selectTab(e: any): void {
  //   this.tab = e.target.item;
  //   console.log(e.target.item);
  // }

  constructor(private router: Router) { }

  goToPerson() {
    this.router.navigate(['/profile']);
  }
  goTodiscounts() {
    this.router.navigate(['/discounts']);
  }
  goToLogout() {
    let logout = confirm("Do you really want to go out ?");

    if (logout === true) {
      this.router.navigate(['/discounts']);
    }
    else {
      return
    }
  }
}
