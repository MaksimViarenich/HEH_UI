import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationPreferences } from '../../models/notification-preferences';
import { HEADER_TABS } from '../../models/tab';
import { RoleService } from '../../services/role-service/role.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit{
  tabs: any;

  user: NotificationPreferences = {
    username: 'Michael Browk',
    userphoto: '../../../assets/images/user.jpg',
    location: 'Belarus, Minsk',
    address: 'Naturalistov, 3',
  };

  constructor(private router: Router,
              private roleService: RoleService) {
    this.tabs = [];
  }

  getTabs(): any {
    const role = this.roleService.getRoles();

    switch (true) {
      case (role.administrator):
        return this.tabs = HEADER_TABS;

      case (role.moderator):
        return this.tabs = HEADER_TABS.slice(0, 3);

      case (role.employee):
        return this.tabs = HEADER_TABS.slice(0, 2);
    }
  }

  goToPerson(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    localStorage.removeItem('isAuth');
    this.router.navigate(['/login']);
  }

  goToMain(): void {
    this.router.navigate(['/discounts']);
  }

  ngOnInit(): any {
    this.tabs = this.getTabs();
  }
}
