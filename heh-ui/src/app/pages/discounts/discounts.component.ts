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
      this.getDiscounts();
    });
  }

  applySearch(filters: any): void {
    this.filterService.setQueryParams(filters);
    this.discountService.getSearchDiscounts().subscribe((data: any) => {
    this.discounts = data.value;
    });
  }

  ngOnInit(): void {
    this.filterService.queryParams = '';
    // this.filterService.queryTextParam = '';
    this.getDiscounts();
  }
}
