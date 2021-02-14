import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from '../../../services/spinner-service/spinner.service';

interface PageTitles {
  localizationKey: string;
  pagePath: string;
}

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit, AfterViewChecked {
  showSpinner: boolean | undefined;

  route: string;
  imagePath: string;
  pageTitle: string;

  pageTitles: PageTitles[] = [
    {localizationKey: 'header.discounts', pagePath: '/discounts'},
    {localizationKey: 'header.favorites', pagePath: '/favorites'},
    {localizationKey: 'header.profile', pagePath: '/profile'},
    {localizationKey: 'header.moderator', pagePath: '/moderator/vendors'},
    {localizationKey: 'header.moderator', pagePath: '/moderator/categories_tags'},
    {localizationKey: 'header.admin', pagePath: '/admin/users'},
    {localizationKey: 'header.admin', pagePath: '/admin/statistics'},
    {localizationKey: 'header.admin', pagePath: '/admin/history'}
  ];

  constructor(private router: Router,
              public spinnerService: SpinnerService,
              private cdRef: ChangeDetectorRef) {
    this.route = this.router.url;
    this.imagePath = '';
    this.pageTitle = '';

    this.getLocalizationKey();
  }

  ngOnInit(): void {
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
