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

  constructor(private historyService: HistoryService,
              private toaster: ToasterService) {
  }

  ngOnInit(): void {
    this.historyService.getHistory().subscribe(
      (data) => {
        this.eventData = data;
        this.dataSource = new MatTableDataSource(this.eventData);
        this.toaster.open('History has been received', 'success');
      },
      (error) => {
        this.toaster.open('Сan not get history');
      }
    );
  }
}
