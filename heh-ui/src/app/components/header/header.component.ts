import { Component, ViewEncapsulation, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HEADER_TABS } from 'src/app/models/tab';
import { RoleService } from 'src/app/services/role-service/role.service';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {

  @Output() sidenavToggle: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,
              private roleService: RoleService) {
    this.tabs = [];
  }
  tabs: any;
  user: UserInfo | undefined;

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

  onSidenavToggle(): any {
    this.sidenavToggle.emit();
  }
}
