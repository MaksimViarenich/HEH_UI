import {Component, ViewEncapsulation, Input, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-discount-card',
  templateUrl: './edit-discount-card.component.html',
  styleUrls: ['./edit-discount-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditDiscountCardComponent {
  @Input() discountInfo: any;
  @Output() removeDiscountFromVendor: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  deleteDiscount(): void{
    this.removeDiscountFromVendor.emit();
  }
}
