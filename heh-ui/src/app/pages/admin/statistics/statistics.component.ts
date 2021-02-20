import { ModalService } from 'src/app/services/modal-service/modal.service';
import { FiltersService } from 'src/app/services/filter-service/filters.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { StatisticsService } from './statistics.service';
import { DiscountCard } from '../../../models/discount-card';

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

  constructor(public dialog: MatDialog,
              private filterService: FiltersService,
              private statisticsService: StatisticsService,
              private toaster: ToasterService,
              private modalService: ModalService) {
                this.filterService.queryParams = '';
                this.topStatistics = 16;
                this.skipStatistics = 0;
                this.previousScrollPosition = 0;
                this.totalCount = 0;
                this.breakpoint = 0;
              }

  statistics: Array<DiscountCard> = [];

  ngOnInit(): void {
    this.getStatistics(this.topStatistics, this.skipStatistics);
    if (window.innerWidth > 1200) {
      this.breakpoint = 4;
    } else if (window.innerWidth <= 1200 && window.innerWidth > 800) {
      this.breakpoint = 3;
    } else if (window.innerWidth <= 800 && window.innerWidth > 540) {
      this.breakpoint = 2;
    }else if (window.innerWidth <= 540) {
      this.breakpoint = 1;
    }
  }

  getStatisticsWrapper(filters: any): void {
    this.statistics = [];
    this.skipStatistics = 0;
    this.previousScrollPosition = 0;
    this.getStatistics(this.topStatistics, this.skipStatistics, filters);
  }

  openDiscountDetails(discount: any): void {
    this.modalService.openDiscountDetailsModal(discount.id, true, discount.viewsAmount);
  }

  getStatistics(top: any, skip: any, filter?: any): any {
    this.statisticsService.getDiscountsStatistics(filter, top, skip).subscribe(
      (data: any) => {
        data.value.forEach((discount: any) => {
          this.statistics.push(discount);
        });
        this.totalCount = data['@odata.count'];
     },
      () => {
        this.toaster.open('There is no possibility to show statistics');
      }
    );
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !(this.statistics.length === this.totalCount)) {
      this.skipStatistics += this.topStatistics;
      this.getStatistics(this.topStatistics, this.skipStatistics);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }

  onResize(event: any): void {
    if (event.target.innerWidth > 1200) {
      this.breakpoint = 4;
    } else if (event.target.innerWidth <= 1200 && event.target.innerWidth > 800) {
      this.breakpoint = 3;
    } else if (event.target.innerWidth <= 800 && event.target.innerWidth > 540) {
      this.breakpoint = 2;
    }else if (event.target.innerWidth <= 540) {
      this.breakpoint = 1;
    }
  }
}
