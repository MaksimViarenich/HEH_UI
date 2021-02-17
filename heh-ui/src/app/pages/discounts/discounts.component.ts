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

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private discountService: DiscountsService,
              private toaster: ToasterService,
              private filterService: FiltersService) {
    this.filterService.queryParams = '';
  }

  getDiscounts(filters?: any): void {
    if (filters) {
      this.filterService.setQueryParams(filters);
    }
    this.discountService.getSearchDiscounts().subscribe(
      (data: any) => {
        this.discounts = data.value;
      },
      (error: any) => {
        this.toaster.open('Сan not get discounts');
      }
    );
  }

  openDiscountDetails(discount: Discount): void {
    const dialogRef = this.modalService.openDiscountDetailsModal(discount);

    dialogRef.afterClosed().subscribe(() => {
      this.getDiscounts();
    });
  }

  ngOnInit(): void {
    this.getDiscounts();
  }
}
