import { FiltersService } from 'src/app/services/filter-service/filters.service';
import { DiscountsService } from './../../discounts/discounts.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VendorCard } from '../../../models/vendor-card';
import { ToasterService } from '../../../services/toaster-service/toaster.service';

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

  constructor(public dialog: MatDialog,
              private discountsService: DiscountsService,
              private filterService: FiltersService,
              private toaster: ToasterService) {
                this.filterService.queryParams = '';
                this.topStatistics = 16;
                this.skipStatistics = 0;
                this.previousScrollPosition = 0;
                this.totalCount = 0;
              }

  list: Array<VendorCard> = [];

  ngOnInit(): void {
  }

  getStatistics(): any {
    this.discountsService.getDiscountsStatistics().subscribe(
      (data) => {
        this.list = data;
      },
      (error) => {
        this.toaster.open('There is no possibility to show statistics');
      }
    );
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !(this.discounts.length === this.totalCount)) {
      this.skipDiscounts += this.topDiscounts;
      this.getDiscounts(this.topDiscounts, this.skipDiscounts);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }
}
