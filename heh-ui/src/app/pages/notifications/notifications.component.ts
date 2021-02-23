import { ModalService } from 'src/app/services/modal-service/modal.service';
import { NotificationService } from './notification.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationElement } from '../../models/notification-element';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'type', 'title', 'message'];
  notificationData: NotificationElement[];
  searchData: any = {};
  dataSource: any;
  topNotifications: any;
  skipNotifications: any;
  previousScrollPosition: any;
  totalCountEvents: any;

  constructor(public dialog: MatDialog,
              private toaster: ToasterService,
              private notificationService: NotificationService,
              private modalService: ModalService) {
    this.topNotifications = 20;
    this.skipNotifications = 0;
    this.previousScrollPosition = 0;
    this.totalCountEvents = 0;

    this.notificationData = [];
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
        data.value.forEach((event: any) => {
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

  openNotificationDetailModal(id: string): any {
    this.modalService.openNotificationDetailModal(id);
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !(this.notificationData.length === this.totalCountEvents)) {
      this.skipNotifications += this.topNotifications;
      this.getNotifications(this.searchData, this.topNotifications, this.skipNotifications);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }

  ngOnInit(): void {
    this.getNotifications(this.searchData, this.topNotifications, this.skipNotifications);
  }
}
