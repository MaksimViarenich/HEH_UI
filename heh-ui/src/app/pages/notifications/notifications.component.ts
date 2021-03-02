import { HeaderService } from './../../components/header/header.service';
import { NotificationService } from './notification.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationElement } from '../../models/notification-element';
import { forEach, size, isEqual } from 'lodash';
import { NgxGlobalEventsService } from 'ngx-global-events';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationsComponent implements OnInit {
  displayedColumns: string[] = ['read', 'date', 'type', 'title', 'message'];
  notificationData: NotificationElement[];
  searchData: any = {};
  dataSource: any;
  topNotifications: any;
  skipNotifications: any;
  previousScrollPosition: any;
  totalCountEvents: any;
  notificationCount: any;

  constructor(public dialog: MatDialog,
              private toaster: ToasterService,
              private notificationService: NotificationService,
              private globalEventsService: NgxGlobalEventsService,
              private headerService: HeaderService) {
    this.topNotifications = 20;
    this.skipNotifications = 0;
    this.previousScrollPosition = 0;
    this.totalCountEvents = 0;

    this.notificationData = [];
    this.notificationCount = 0;
  }

  applyNotificationSearch(): void {
    this.notificationData = [];
    this.skipNotifications = 0;
    this.previousScrollPosition = 0;
    this.getNotifications(this.searchData, this.topNotifications, this.skipNotifications);
  }

  getNotifications(searchData: any, top: any, skip: any): void {
    this.notificationService.getSearchNotifications(searchData, top, skip).subscribe(
      (data: any) => {
        forEach(data.value, (event: any) => {
          this.notificationData.push(event);
        });

        this.dataSource = new MatTableDataSource(this.notificationData);
        this.totalCountEvents = data['@odata.count'];
      },
      () => {
        this.toaster.open('Сan not get notifications');
      }
    );
  }

  readOneOrAllNotification(type: string, id?: string, isRead?: boolean): any {
    if (!isRead && this.notificationCount !== 0) {
      this.notificationService.readNotifications(type, id).subscribe(() => {
        this.applyNotificationSearch();
        this.setCount();

        this.globalEventsService.emit('updateNotificationCount');
      },
      () => {
        this.toaster.open('Сan not read notification');
      });
    }
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !isEqual(size(this.notificationData), this.totalCountEvents)) {
      this.skipNotifications += this.topNotifications;
      this.getNotifications(this.searchData, this.topNotifications, this.skipNotifications);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }

  setCount(): any {
    this.headerService.getNotificationsCount().subscribe(
      (data) => {
        this.notificationCount = data;
      }
    );
  }

  ngOnInit(): void {
    this.getNotifications(this.searchData, this.topNotifications, this.skipNotifications);
    this.setCount();
  }
}
