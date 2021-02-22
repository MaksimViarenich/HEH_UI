import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { MatDialog } from '@angular/material/dialog';
import { EventNotificationElement } from '../../models/event-notification-element';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'type', 'title', 'message'];
  eventData: EventNotificationElement[] = [];
  searchData: any = {};
  dataSource: any;
  topNotifications: any;
  skipNotifications: any;
  previousScrollPosition: any;
  totalCountEvents: any;

  constructor(public dialog: MatDialog,
              private toaster: ToasterService, ) {
    this.topNotifications = 20;
    this.skipNotifications = 0;
    this.previousScrollPosition = 0;
    this.totalCountEvents = 0;

    this.eventData = [
      {
        date: new Date('2021-02-22T12:48:00.987Z'),
        title: 'test1',
        message: 'test1 discount was added',
        type: 'new discount',
      },
      {
        date: new Date('2021-02-19T12:48:00.987Z'),
        title: 'test2',
        message: 'test2 discount was added',
        type: 'new discount',
      },
      {
        date: new Date('2021-01-12T19:07:00.987Z'),
        title: 'test3',
        message: 'test3 discount was added',
        type: 'new discount',
      },
    ];
  }

  // applyHistorySearch(): void {
  //   this.eventData = [];
  //   this.skipEvents = 0;
  //   this.previousScrollPosition = 0;
  //   this.getNotifications(this.searchData, this.topNotifications, this.skipEvents);
  // }

  // getNotifications(searchData: any, top: any, skip: any): void {
  //   this.historyService.getSearchHistory(searchData, top, skip).subscribe(
  //     (data: any) => {
  //       data.value.forEach((event: any) => {
  //         this.eventData.push(event);
  //       });
  //
  //       this.dataSource = new MatTableDataSource(this.eventData);
  //       this.totalCountEvents = data['@odata.count'];
  //     },
  //     () => {
  //       this.toaster.open('Сan not get notifications');
  //     }
  //   );
  // }

  // onScrollDown(event: any): void {
  //   if (event.currentScrollPosition > this.previousScrollPosition && !(this.eventData.length === this.totalCountEvents)) {
  //     this.skipEvents += this.topNotifications;
  //     this.getNotifications(this.searchData, this.topNotifications, this.skipEvents);
  //     this.previousScrollPosition = event.currentScrollPosition;
  //   }
  // }

  ngOnInit(): void {
    // this.getNotifications(this.searchData, this.topNotifications, this.skipEvents);
    this.dataSource = new MatTableDataSource(this.eventData);
  }
}
