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

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private discountService: DiscountsService,
              private toaster: ToasterService) {
    this.topDiscounts = 8;
    this.skipDiscounts = 0;
    this.previousScrollPosition = 0;
  }

  getDiscounts(top: any, skip: any): void {
    this.discountService.getDiscounts(top, skip).subscribe(
      (data) => {
        data.value.forEach((discount: any) => {
          this.discounts.push(discount);
        });
      },
      (error) => {
        this.toaster.open('Сan not get discounts');
      }
    );
  }

  openDiscountDetails(discount: Discount): void {
    const dialogRef = this.modalService.openDiscountDetailsModal(discount);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      this.getDiscounts(this.topDiscounts, this.skipDiscounts);
    });
  }

  ngOnInit(): void {
    this.getDiscounts(this.topDiscounts, this.skipDiscounts);
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition) {
      this.skipDiscounts += this.topDiscounts;
      this.getDiscounts(this.topDiscounts, this.skipDiscounts);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }
}
