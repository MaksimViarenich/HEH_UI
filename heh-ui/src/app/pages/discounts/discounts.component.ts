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

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private discountService: DiscountsService,
              private toaster: ToasterService) {
  }

  getDiscounts(): void {
    this.discountService.getDiscounts().subscribe(
      (data) => {
        this.discounts = data.value;
        this.toaster.open('Discounts have been received', 'success');
      },
      (error) => {
        this.toaster.open('Сan not get discounts');
      }
    );
  }

  openDiscountDetails(discount: Discount): void {
    const dialogRef = this.modalService.openDiscountDetailsModal(discount);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getDiscounts();
    });
  }

  addSearchData(searchData: any): void {
    this.discountService.getSearchDiscounts(searchData).subscribe((data: any) => {
      this.discounts = data.value;
    });
  }

  ngOnInit(): void {
    this.getDiscounts();
  }
}
