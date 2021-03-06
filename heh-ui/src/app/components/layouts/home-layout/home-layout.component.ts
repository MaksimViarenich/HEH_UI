import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { slice, includes, now, find, isEqual } from 'lodash';
import { UserInfo } from 'src/app/models/user-info';
import { HEADER_TABS } from 'src/app/models/tab';
import { RoleService } from 'src/app/services/role-service/role.service';
import { SpinnerService } from '../../../services/spinner-service/spinner.service';
import { SelectBackgroundService } from '../../select-background/select-background.service';
import { HeaderService } from '../../header/header.service';
import { ToasterService } from 'src/app/services/toaster-service/toaster.service';
import { PageTitle } from '../../../models/page-title';
import { HomeLayoutService } from './home-layout.service';
import { Background } from '../../../models/background';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomeLayoutComponent implements OnInit, OnDestroy, AfterViewChecked {
  tabs: any;
  user: UserInfo | undefined;
  notificationsCount: number;
  timerId: any;
  route: string;
  imagePath: string;
  pageTitle: string;
  token: any;
  backgrounds: Array<Background>;
  activeBackground: Background;
  pageTitles: PageTitle[] = [];

  constructor(
    private router: Router,
    public spinnerService: SpinnerService,
    private cdRef: ChangeDetectorRef,
    private roleService: RoleService,
    private selectBackgroundServer: SelectBackgroundService,
    private headerService: HeaderService,
    private toaster: ToasterService,
    private homeLayoutService: HomeLayoutService,
  ) {
    this.route = this.router.url;
    this.imagePath = '';
    this.pageTitle = '';
    this.token = '';
    this.backgrounds = selectBackgroundServer.getBackgrounds();
    this.activeBackground = JSON.parse(localStorage.getItem('background') as string) || this.backgrounds[0];
    this.getLocalizationKey();
    this.tabs = [];
    this.notificationsCount = 0;
    this.pageTitles = homeLayoutService.getPageTitles();
  }

  ngOnInit(): void {
    this.tokenExpirationLogout();
    this.tabs = this.getTabs();
    document.body.style.background = (this.activeBackground?.background as string);
    this.selectBackgroundServer.changeColorTheme(this.activeBackground);

    this.setNotificationsCount();
    this.timerId = setInterval(() => {
      this.setNotificationsCount();
    }, 1000 * 60);
  }

  setNotificationsCount(): void {
    this.headerService.getNotificationsCount().subscribe(
      (data) => {
        this.notificationsCount = data;
      },
      () => {
        this.toaster.open('Сan not get notifications count');
      }
    );
  }

  getTabs(): any {
    const role = this.roleService.getRoles();

    switch (true) {
      case (includes(role, 'administrator')):
        return this.tabs = HEADER_TABS;

      case (includes(role, 'moderator')):
        return this.tabs = slice(HEADER_TABS, 0, 4);

      case (includes(role, 'employee')):
        return this.tabs = slice(HEADER_TABS, 0, 3);
    }
  }

  tokenExpirationLogout(): any {
    const dateNow = now();
    const expDate = Number(localStorage.getItem('expDate'));

    setTimeout(() => {
      localStorage.removeItem('isAuth');
      localStorage.removeItem('expDate');

      this.router.navigate(['/login']);
    }, (expDate - dateNow));
  }

  ngAfterViewChecked(): void {
    this.spinnerInit();
  }

  spinnerInit(): void {
    this.spinnerService.getSpinner().subscribe(() => {
      this.cdRef.detectChanges();
    });
  }

  getLocalizationKey(): string {
    this.route = this.router.url;
    const titleOption = find(this.pageTitles, item => isEqual(item.pagePath, this.route));

    return (titleOption) ? titleOption?.localizationKey : 'Unknown Page';
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }
}
