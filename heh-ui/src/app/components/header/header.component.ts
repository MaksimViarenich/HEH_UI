import { Component, ViewEncapsulation, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HEADER_TABS } from 'src/app/models/tab';
import { RoleService } from 'src/app/services/role-service/role.service';
import { UserInfo } from 'src/app/models/user-info';
import { HeaderService } from './header.service';
import { ToasterService } from 'src/app/services/toaster-service/toaster.service';
import { NgxGlobalEventsService } from 'ngx-global-events';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sidenavToggle: EventEmitter<any> = new EventEmitter();
  @Output() closeSidenav: EventEmitter<any> = new EventEmitter();
  @Input() menuIsActive: boolean | undefined;
  notificationsCount: number;
  timerId: any;

  constructor(private router: Router,
              private roleService: RoleService,
              private headerService: HeaderService,
              private toaster: ToasterService,
              private globalEventsService: NgxGlobalEventsService) {
    this.tabs = [];
    this.menuIsActive = false;
    this.notificationsCount = 0;
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

  ngOnInit(): void {
      this.tabs = this.getTabs();
      this.setNotificationsCount();
      this.timerId = setInterval(() => {
        this.setNotificationsCount();
      }, 1000 * 60);
      this.globalEventsService.get('updateNotificationCount').subscribe(() => {
        this.setNotificationsCount();
      });
  }

  goToMain(): void {
    this.router.navigate(['/discounts']);
    this.closeSidenav.emit();
  }

  onSidenavToggle(): void {
    this.sidenavToggle.emit();
    this.menuIsActive = !this.menuIsActive;
  }

  setNotificationsCount(): void {
      this.headerService.getNotificationsCount().subscribe(
        (data) => {
          this.notificationsCount = data;
        },
        (error) => {
          this.toaster.open('Сan not get notifivations count');
        }
      );
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }
}
