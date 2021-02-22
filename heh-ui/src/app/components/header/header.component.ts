import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HEADER_TABS } from '../../models/tab';
import { RoleService } from '../../services/role-service/role.service';
import { UserInfo } from '../../models/user-info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {
  tabs: any;
  user: UserInfo | undefined;

  constructor(private router: Router,
              private roleService: RoleService) {
    this.tabs = [];
  }

  getTabs(): any {
    const role = this.roleService.getRoles();

    switch (true) {
      case (role.includes('administrator')):
        return this.tabs = HEADER_TABS;

      case (role.includes('moderator')):
        return this.tabs = HEADER_TABS.slice(0, 4);

      case (role.includes('employee')):
        return this.tabs = HEADER_TABS.slice(0, 3);
    }
  }

  goToMain(): void {
    this.router.navigate(['/discounts']);
  }

  ngOnInit(): any {
    this.tabs = this.getTabs();
  }
}
