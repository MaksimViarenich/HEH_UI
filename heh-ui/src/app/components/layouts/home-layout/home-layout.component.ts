import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/models/user-info';
import { HEADER_TABS } from 'src/app/models/tab';
import { RoleService } from 'src/app/services/role-service/role.service';
import { SpinnerService } from '../../../services/spinner-service/spinner.service';

interface PageTitles {
  localizationKey: string;
  pagePath: string;
}

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeLayoutComponent implements OnInit, AfterViewChecked {
  showSpinner: boolean | undefined;

  route: string;
  imagePath: string;
  pageTitle: string;
  token: any;

  pageTitles: PageTitles[] = [
    {localizationKey: 'header.discounts', pagePath: '/discounts'},
    {localizationKey: 'header.favorites', pagePath: '/favorites'},
    {localizationKey: 'header.notifications', pagePath: '/notifications'},
    {localizationKey: 'header.profile', pagePath: '/profile'},
    {localizationKey: 'header.moderator', pagePath: '/moderator/vendors'},
    {localizationKey: 'header.moderator', pagePath: '/moderator/categories_tags'},
    {localizationKey: 'header.admin', pagePath: '/admin/users'},
    {localizationKey: 'header.admin', pagePath: '/admin/statistics'},
    {localizationKey: 'header.admin', pagePath: '/admin/history'}
  ];

  constructor(private router: Router,
              public spinnerService: SpinnerService,
              private cdRef: ChangeDetectorRef,
              private roleService: RoleService) {
    this.route = this.router.url;
    this.imagePath = '';
    this.pageTitle = '';
    this.token = '';

    this.getLocalizationKey();
    this.tabs = [];
  }

  tabs: any;
  user: UserInfo | undefined;

  ngOnInit(): void {
    this.tokenExpirationLogout();
    this.tabs = this.getTabs();
  }

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

  tokenExpirationLogout(): any {
    const dateNow = Date.now();
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
    this.spinnerService.getSpinner().subscribe((status) => {
      this.cdRef.detectChanges();
    });
  }

  getLocalizationKey(): string {
    this.route = this.router.url;
    const titleOption = this.pageTitles.find(item => item.pagePath === this.route);

    return (titleOption) ? titleOption?.localizationKey : 'Unknown Page';
  }
}
