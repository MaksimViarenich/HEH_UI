import { DiscountsService } from './discounts.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Discount } from '../../models/discount';
import { FiltersService } from './filters.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { DiscountDetailsModalComponent } from './discount-details-modal/discount-details-modal.component';
import { ModalService } from 'src/app/services/modal-service/modal.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {

  discounts: Array<Discount> = [];

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
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
    const dialogRef = this.modalService.openDiscountDetailsModal(discount);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      this.getDiscounts();
    });
  }

  ngOnInit(): void {
    this.getDiscounts();
  }
}
