import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface EventDataElement {
  date: Date;
  state: string;
  user: string;
  description: string;
}

const EVENT_DATA: EventDataElement[] = [
  {date: new Date(2021, 1, 28, 11, 34), state: 'add', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 1, 28, 11, 34), state: 'delete', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 2, 28, 11, 34), state: 'add', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 2, 28, 11, 34), state: 'edit', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 2, 28, 11, 34), state: 'add', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 2, 28, 11, 34), state: 'delete', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 3, 28, 11, 34), state: 'delete', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 3, 28, 11, 34), state: 'add', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 3, 28, 11, 34), state: 'edit', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 4, 28, 11, 34), state: 'edit', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 2, 28, 11, 34), state: 'add', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 2, 28, 11, 34), state: 'edit', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 2, 28, 11, 34), state: 'add', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 2, 28, 11, 34), state: 'delete', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 3, 28, 11, 34), state: 'delete', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 3, 28, 11, 34), state: 'add', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 3, 28, 11, 34), state: 'edit', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'},
  {date: new Date(2021, 4, 28, 11, 34), state: 'edit', user: 'Michael Browk', description: 'Added a new discount Domino’s pizza'}
];

@Component({
  selector: 'app-event-history',
  templateUrl: './event-history.component.html',
  styleUrls: ['./event-history.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventHistoryComponent implements AfterViewInit {
  displayedColumns: string[] = ['date', 'state', 'user', 'description'];
  dataSource = new MatTableDataSource(EVENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
