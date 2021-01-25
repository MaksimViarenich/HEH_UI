import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DiscountDetailsModalComponent } from './discount-details-modal/discount-details-modal.component';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {

  searchFieldsOptions: any[];
    
  constructor(public dialog: MatDialog) {
    this.searchFieldsOptions = [
      {label: 'Category', options: ['Food', 'Sport', 'Beauty']},
      {label: 'Tag', options: ['Pizza', 'Sushi', 'Barbershop', 'Swimm pool']},
      {label: 'Vendor', options: ['Garage', 'Best Beauty Center', 'GYM24']},
    ];
  }

  openDiscountDetails(): void {
    const dialogRef = this.dialog.open(DiscountDetailsModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}
