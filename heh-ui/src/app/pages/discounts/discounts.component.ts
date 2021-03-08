import { DiscountsService } from './discounts.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { isEqual, size, forEach } from 'lodash';
import { Discount } from '../../models/discount';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { ModalService } from 'src/app/services/modal-service/modal.service';
import { GridService } from '../../services/grid-service/grid.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})

export class DiscountsComponent implements OnInit {
  discounts: Array<Discount> = [];
  topDiscounts: any;
  skipDiscounts: any;
  previousScrollPosition: any;
  totalCount: any;
  breakpoint: number;
  isVisibleEditNote = false;
  filterStorage: any;
  doubleFilters: any;

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private discountService: DiscountsService,
              private toaster: ToasterService,
              private gridService: GridService) {
    this.topDiscounts = 16;
    this.skipDiscounts = 0;
    this.previousScrollPosition = 0;
    this.totalCount = 0;
    this.breakpoint = 0;
    this.filterStorage = {};
  }

  getDiscountsWrapper(filters: any): void {
    this.filterStorage = {};
    this.filterStorage = filters;
    filters.experationDate = true;
    this.doubleFilters = filters;
    this.discounts = [];
    this.skipDiscounts = 0;
    this.previousScrollPosition = 0;
    this.getDiscounts(this.topDiscounts, this.skipDiscounts, filters);
  }

  getDiscounts(top: any, skip: any, filters?: any): void {
    this.discountService.getSearchDiscounts(filters, top, skip).subscribe(
      (data: any) => {
        forEach(data.value, (discount: any) => {
          this.discounts.push(discount);
        });
        this.totalCount = data['@odata.count'];
     },
      () => {
        this.toaster.open('Сan not get discounts');
      }
    );
  }

  openDiscountDetails(discount: Discount): void {
    const dialogRef = this.modalService.openDiscountDetailsModal(discount.id);
    dialogRef.afterClosed().subscribe((data: any) => {
      this.discounts = [];
      this.getDiscounts(this.topDiscounts, this.skipDiscounts, this.doubleFilters);
    });
  }

  ngOnInit(): void {
    this.breakpoint = this.gridService.getDiscountGrid(window.innerWidth);
  }

  onResize(event: any): void {
    this.breakpoint = this.gridService.getDiscountGrid(event.target.innerWidth);
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !isEqual(size(this.discounts), this.totalCount)) {
      this.skipDiscounts += this.topDiscounts;
      this.getDiscounts(this.topDiscounts, this.skipDiscounts, this.filterStorage);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }
}
