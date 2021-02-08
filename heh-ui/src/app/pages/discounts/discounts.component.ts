import { DiscountsService } from './discounts.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Discount } from '../../models/discount';
import { ModalService } from '../../services/modal-service/modal.service';
import { FiltersService } from './filters.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {

  discounts: Array<Discount> = [];

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private filtersService: FiltersService,
              private discountService: DiscountsService,
              private toaster: ToasterService) {
  }

  openDiscountDetails(discount: Discount): void {
    // this.modalService.openDiscountDetailsModal(discount);
  }

  ngOnInit(): void {
    this.discountService.getDiscounts().subscribe(
      (data) => {
        this.discounts = data.value;
      },
      (error) => {
        this.toaster.open('Сan not get discounts');
      }
    );
  }
}
