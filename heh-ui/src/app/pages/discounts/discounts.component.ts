import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DiscountDetailsModalComponent } from './discount-details-modal/discount-details-modal.component';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDiscountDetails(): void {
    const dialogRef = this.dialog.open(DiscountDetailsModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}
