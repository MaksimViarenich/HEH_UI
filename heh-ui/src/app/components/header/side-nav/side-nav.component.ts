import { ModalService } from 'src/app/services/modal-service/modal.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HEADER_TABS } from 'src/app/models/tab';
import { RoleService } from 'src/app/services/role-service/role.service';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnInit {

  constructor(private router: Router,
              private roleService: RoleService,
              private modalService: ModalService) {
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
      return this.tabs = HEADER_TABS.slice(0, 3);

    case (role.includes('employee')):
      return this.tabs = HEADER_TABS.slice(0, 2);
}
}

  goToMain(): void {
    this.router.navigate(['/discounts']);
  }

  openSideNav(): any {
    this.modalService.openSideNav();
  }

  ngOnInit(): any {
    this.tabs = this.getTabs();
  }
}
