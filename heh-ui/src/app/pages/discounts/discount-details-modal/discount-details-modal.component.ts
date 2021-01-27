import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiscountCard } from '../../../models/discount-card';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details-modal.component.html',
  styleUrls: ['./discount-details-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DiscountDetailsModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DiscountCard
  ) {
  }
  address = new FormControl();

  ngOnInit(): void {
  }

}
