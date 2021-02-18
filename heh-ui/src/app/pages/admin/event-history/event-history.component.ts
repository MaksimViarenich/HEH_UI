import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HistoryService } from './history.service';
import { EventHistoryElement } from '../../../models/event-history-element';
import { ToasterService } from '../../../services/toaster-service/toaster.service';

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventHistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'action', 'user', 'description'];
  eventData: EventHistoryElement[] = [];
  dataSource: any;
  topEvents: any;
  skipEvents: any;
  previousScrollPosition: any;
  totalCountEvents: any;

  constructor(private historyService: HistoryService,
              private toaster: ToasterService) {
    this.topEvents = 20;
    this.skipEvents = 0;
    this.previousScrollPosition = 0;
    this.totalCountEvents = 0;
  }

  getEventHistory(top: any, skip: any): void {
    this.historyService.getHistory(top, skip).subscribe(
      (data) => {
        data.value.forEach((event: any) => {
          this.eventData.push(event);
        });

        this.dataSource = new MatTableDataSource(this.eventData);
        this.totalCountEvents = data['@odata.count'];
      },
      (error) => {
        this.toaster.open('Сan not get history');
      }
    );
  }

  ngOnInit(): void {
    this.getEventHistory(this.topEvents, this.skipEvents);
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !(this.eventData.length === this.totalCountEvents)) {
      this.skipEvents += this.topEvents;
      this.getEventHistory(this.topEvents, this.skipEvents);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }
}
