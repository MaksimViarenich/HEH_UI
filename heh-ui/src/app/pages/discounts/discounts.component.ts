import { DiscountsService } from './discounts.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Discount } from '../../models/discount';
import { FiltersService } from './filters.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { DiscountDetailsModalComponent } from './discount-details-modal/discount-details-modal.component';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {

  discounts: Array<Discount> = [];

  constructor(public dialog: MatDialog,
              private discountService: DiscountsService,
              private toaster: ToasterService) {
  }

  getDiscounts(): void {
    this.discountService.getDiscounts().subscribe(
      (data) => {
        this.discounts = data.value;
      },
      (error) => {
        this.toaster.open('Сan not get discounts');
      }
    );
  }

  openDiscountDetails(discount: Discount): void {
    const dialogRef = this.dialog.open(DiscountDetailsModalComponent, {
      data: discount,
      maxWidth: '33rem',
      panelClass: 'discount-details-modal',
      backdropClass: 'discount-details-modal-backdrop',
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getDiscounts();
    });
  }

  ngOnInit(): void {
    this.getDiscounts();
  }
}
