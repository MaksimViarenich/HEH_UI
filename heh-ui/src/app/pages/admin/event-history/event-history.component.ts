import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HistoryService } from './history.service';
import { EventHistoryElement } from '../../../models/event-history-element';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { FiltersService } from '../../../services/filter-service/filters.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal-service/modal.service';

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventHistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'action', 'user', 'description'];
  eventData: EventHistoryElement[] = [];
  searchData: any = {};
  dataSource: any;
  topEvents: any;
  skipEvents: any;
  previousScrollPosition: any;
  totalCountEvents: any;

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private historyService: HistoryService,
              private toaster: ToasterService,
              private filterService: FiltersService) {
    this.topEvents = 20;
    this.skipEvents = 0;
    this.previousScrollPosition = 0;
    this.totalCountEvents = 0;
  }

  applyHistorySearch(): void {
    this.eventData = [];
    this.skipEvents = 0;
    this.previousScrollPosition = 0;
    this.getEventHistory(this.searchData, this.topEvents, this.skipEvents);
  }

  getEventHistory(searchData: any, top: any, skip: any): void {
    this.historyService.getSearchHistory(searchData, top, skip).subscribe(
      (data: any) => {
        data.value.forEach((event: any) => {
          this.eventData.push(event);
        });

        this.dataSource = new MatTableDataSource(this.eventData);
        this.totalCountEvents = data['@odata.count'];
      },
      () => {
        this.toaster.open('Сan not get history');
      }
    );
  }

  ngOnInit(): void {
    this.getEventHistory(this.searchData, this.topEvents, this.skipEvents);
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !(this.eventData.length === this.totalCountEvents)) {
      this.skipEvents += this.topEvents;
      this.getEventHistory(this.searchData, this.topEvents, this.skipEvents);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }
}
