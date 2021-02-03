import {OnInit, Component, Inject, ViewEncapsulation} from '@angular/core';
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

  lat = 53.90731553965919;
  lng = 27.552685142738643;

  ngOnInit(): void {
  }

}
