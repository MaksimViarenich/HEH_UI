import { DiscountsService } from './discounts.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Discount } from '../../models/discount';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { ModalService } from 'src/app/services/modal-service/modal.service';
import { FiltersService } from 'src/app/services/filter-service/filters.service';

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

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private discountService: DiscountsService,
              private toaster: ToasterService,
              private filterService: FiltersService) {
    this.filterService.queryParams = '';
    this.topDiscounts = 16;
    this.skipDiscounts = 0;
    this.previousScrollPosition = 0;
    this.totalCount = 0;
  }

  getDiscountsWrapper(filters: any): void {
    this.discounts = [];
    this.skipDiscounts = 0;
    this.previousScrollPosition = 0;
    this.getDiscounts(this.topDiscounts, this.skipDiscounts, filters);
  }

  getDiscounts(top: any, skip: any, filters?: any): void {
    this.discountService.getSearchDiscounts(filters, top, skip).subscribe(
      (data: any) => {
        data.value.forEach((discount: any) => {
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
    this.modalService.openDiscountDetailsModal(discount.id);
  }

  ngOnInit(): void {
    this.getDiscounts(this.topDiscounts, this.skipDiscounts);
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !(this.discounts.length === this.totalCount)) {
      this.skipDiscounts += this.topDiscounts;
      this.getDiscounts(this.topDiscounts, this.skipDiscounts);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }
}
