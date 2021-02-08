import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HistoryService } from './history.service';
import { EventHistoryElement } from '../../../models/event-history-element';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventHistoryComponent implements OnInit {
  displayedColumns: string[] = ['date', 'action', 'user', 'description'];

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(private historyService: HistoryService,
              private snackBar: MatSnackBar) {
  }

  eventData: EventHistoryElement[] = [];
  dataSource: any;

  ngOnInit(): void {
    this.historyService.getHistory().subscribe(
      (data) => {
        this.eventData = data;
        console.log(this.eventData);
        this.dataSource = new MatTableDataSource(this.eventData);
      },
      (error) => {
        this.snackBar.open(
          'Something went wrong',
          'Close',
          {verticalPosition: 'top'}
        );
      }
    );
  }
}
