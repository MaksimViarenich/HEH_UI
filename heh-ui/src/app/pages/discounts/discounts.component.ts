import {DiscountsService} from './discounts.service';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Discount} from '../../models/discount';
import {ModalService} from '../../services/modal-service/modal.service';
import {FiltersService} from './filters.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private filtersService: FiltersService,
              private discountService: DiscountsService) {
  }

  discounts: Array<Discount> = [];

  openDiscountDetails(discount: Discount): void {
    // this.modalService.openDiscountDetailsModal(discount);
  }

  ngOnInit(): void {
    this.discountService.getDiscounts().subscribe(
      (data) => {
        this.discounts = data.value;
      }
    );
  }

}
