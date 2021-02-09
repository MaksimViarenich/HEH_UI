import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Discount} from '../../../../models/discount';

@Component({
  selector: 'app-add-discount-modal',
  templateUrl: './add-discount-modal.component.html',
  styleUrls: ['./add-discount-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddDiscountModalComponent implements OnInit {
  discountDetail: Discount;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.discountDetail = data.discounts;
  }

  vendor = new FormControl();
  address = new FormControl();
  phone = new FormControl();
  name = new FormControl();
  description = new FormControl();
  date = new FormControl();
  tag = new FormControl();
  category = new FormControl();

  // categories: string[] = [
  //   'Food', 'Clothes', 'Shop', 'Beauty', 'Sport', 'Car', 'Health', 'Education',
  // ];

  // tags: string[] = [
  //   'Pizza', 'Sushi', 'Nails',
  // ];

  ngOnInit(): void {
  }
}
