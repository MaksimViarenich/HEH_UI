import { ModalService } from 'src/app/services/modal-service/modal.service';
import { FiltersService } from 'src/app/services/filter-service/filters.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { isEqual, forEach, size } from 'lodash';

import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { StatisticsService } from './statistics.service';
import { DiscountCard } from '../../../models/discount-card';
import { GridService } from '../../../services/grid-service/grid.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  topStatistics: any;
  skipStatistics: any;
  previousScrollPosition: any;
  totalCount: any;
  breakpoint: number;
  filterStorage: any;

  constructor(public dialog: MatDialog,
              private filterService: FiltersService,
              private statisticsService: StatisticsService,
              private toaster: ToasterService,
              private modalService: ModalService,
              private gridService: GridService) {
    this.filterService.queryParams = '';
    this.topStatistics = 16;
    this.skipStatistics = 0;
    this.previousScrollPosition = 0;
    this.totalCount = 0;
    this.breakpoint = 0;
    this.filterStorage = {};
  }

  statistics: Array<DiscountCard> = [];

  ngOnInit(): void {
    this.breakpoint = this.gridService.getDiscountGrid(window.innerWidth);
  }

  getStatisticsWrapper(filters: any): void {
    this.filterStorage = {};
    this.filterStorage = filters;
    filters.experationDate = true;
    this.statistics = [];
    this.skipStatistics = 0;
    this.previousScrollPosition = 0;
    this.getStatistics(this.topStatistics, this.skipStatistics, filters);
  }

  openDiscountDetails(discount: any): void {
    this.modalService.openDiscountDetailsModal(discount.id, false, '', true, discount.viewsAmount);
  }

  getStatistics(top: any, skip: any, filters?: any): any {
    this.statisticsService.getDiscountsStatistics(filters, top, skip).subscribe(
      (data: any) => {
        forEach(data.value, (discount: any) => {
          this.statistics.push(discount);
        });
        this.totalCount = data['@odata.count'];
      },
      () => {
        this.toaster.open('There is no possibility to show statistics');
      }
    );
  }

  exportStatistics(filters?: any): any {
    this.statisticsService.exportDiscountsStatistics(filters).subscribe(
      (response: any) => {
        const headers = response.headers.get('content-disposition');
        const filename = headers.split(';')[1].split('filename')[1].split('=')[1].trim();
        this.downloadFile(response.body, filename);
      },
      (error) => {
        this.toaster.open('There is no possibility to export statistics');
      }
    );
  }

  downloadFile(data: any, filename: string): void{
    const blob = new Blob ([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !isEqual(size(this.statistics), this.totalCount)) {
      this.skipStatistics += this.topStatistics;
      this.getStatistics(this.topStatistics, this.skipStatistics, this.filterStorage);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }

  onResize(event: any): void {
    this.breakpoint = this.gridService.getDiscountGrid(event.target.innerWidth);
  }
}
