import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HistoryService } from './history.service';
import { EventHistoryElement } from '../../../models/event-history-element';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { MatDialog } from '@angular/material/dialog';
import { FiltersService } from 'src/app/services/filter-service/filters.service';
import {AuthService} from '../../../services/auth-service/auth.service';
import {Router} from '@angular/router';

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
  filtersOptions: any;
  dataSource: any;
  topEvents: any;
  skipEvents: any;
  previousScrollPosition: any;
  totalCountEvents: any;

  constructor(public dialog: MatDialog,
              private filtersService: FiltersService,
              private historyService: HistoryService,
              private toaster: ToasterService,
              private router: Router) {
    this.searchData.historyLocation = '';
    this.filtersOptions = {
      locations: [],
    };
    this.topEvents = 20;
    this.skipEvents = 0;
    this.previousScrollPosition = 0;
    this.totalCountEvents = 0;
  }

  applyHistorySearch(): void {
    this.eventData = [];
    this.skipEvents = 0;
    this.previousScrollPosition = 0;
    this.getEventHistory(this.topEvents, this.skipEvents, this.searchData);
  }

  getEventHistory(top: any, skip: any, searchData?: any): void {
    this.historyService.getSearchHistory(top, skip, searchData).subscribe(
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
    this.filtersService.loadFilters().then(() => {
      this.filtersOptions = this.filtersService.getFilters();
    });
    this.getEventHistory(this.topEvents, this.skipEvents);
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !(this.eventData.length === this.totalCountEvents)) {
      this.skipEvents += this.topEvents;
      this.getEventHistory(this.topEvents, this.skipEvents, this.searchData);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }

  routeWithData(state: any): void {
    if (state.userEmail === sessionStorage.getItem('userEmail')) {
      this.router.navigateByUrl('/profile');
    } else {
      this.router.navigateByUrl('/admin/users', { state: {userEmail: state.userEmail }});
    }
  }
}
