import { ToasterService } from './../../../services/toaster-service/toaster.service';
import { NotificationService } from './../notification.service';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationElement } from 'src/app/models/notification-element';

@Component({
  selector: 'app-notification-detail-modal',
  templateUrl: './notification-detail-modal.component.html',
  styleUrls: ['./notification-detail-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationDetailModalComponent implements OnInit {

  notificationData: NotificationElement;

  constructor(public notificationService: NotificationService,
              private toaster: ToasterService,
              @Inject(MAT_DIALOG_DATA) private data: string) {

    this.notificationData = {
      id: '',
      title: '',
      message: '',
      type: '',
      date: '',
      isRead: true
    };
  }

  ngOnInit(): void {
    this.notificationService.getNotificationDetails(this.data).subscribe(
      (data) => {
        this.notificationData = data;
      },
      () => {
        this.toaster.open('Can not get notification id');
      }
    );
  }
}
