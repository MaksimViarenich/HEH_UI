import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiscountDetailsModalComponent } from './discount-details-modal/discount-details-modal.component';
import { SearchOptions } from '../../models/search-options';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {

  searchFieldsOptions: SearchOptions;

  constructor(public dialog: MatDialog) {
    this.searchFieldsOptions = {
      btnLabel: 'Search',
      selectOptions: {
        label: 'Location',
        options: [
          {value: '1', viewValue: 'Belarus, Minsk'},
          {value: '2', viewValue: 'Belarus, Grodno'},
          {value: '3', viewValue: 'Ukraine, Vinnitsa'}
        ]
      },
      multiSelectOptions: [
        {
          label: 'Category',
          options: [
            {value: '4', viewValue: 'Food'},
            {value: '5', viewValue: 'Sport'},
            {value: '6', viewValue: 'Beauty'}
          ]
        },
        {
          label: 'Tag',
          options: [
            {value: '7', viewValue: 'Pizza'},
            {value: '8', viewValue: 'Sushi'},
            {value: '9', viewValue: 'Barbershop'},
            {value: '10', viewValue: 'Swimming pool'},
          ]
        },
        {
          label: 'Vendor',
          options: [
            {value: '11', viewValue: 'Garage'},
            {value: '12', viewValue: 'Best Beauty Center'},
            {value: '13', viewValue: 'GYM24'}
          ]
        },
      ]
    };
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
