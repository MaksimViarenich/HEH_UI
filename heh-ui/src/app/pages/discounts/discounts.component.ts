import { DiscountsService } from './discounts.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Discount } from '../../models/discount';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { ModalService } from 'src/app/services/modal-service/modal.service';

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
  totalCounter: any;

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private discountService: DiscountsService,
              private toaster: ToasterService) {
    this.topDiscounts = 16;
    this.skipDiscounts = 0;
    this.previousScrollPosition = 0;
    this.totalCounter = 0;
  }

  getDiscounts(top: any, skip: any): void {
    this.discountService.getDiscounts(top, skip).subscribe(
      (data) => {
        data.value.forEach((discount: any) => {
          this.discounts.push(discount);
        });
        this.totalCounter = data['@odata.count'];
      },
      (error) => {
        this.toaster.open('Сan not get discounts');
      }
    );
  }

  openDiscountDetails(discount: Discount): void {
    const dialogRef = this.modalService.openDiscountDetailsModal(discount);
  }

  ngOnInit(): void {
    this.getDiscounts(this.topDiscounts, this.skipDiscounts);
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !(this.discounts.length === this.totalCounter)) {
      this.skipDiscounts += this.topDiscounts;
      this.getDiscounts(this.topDiscounts, this.skipDiscounts);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }
}
