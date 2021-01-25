import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  searchFieldsOptions: any[];

  constructor() {
    this.searchFieldsOptions = [
      {label: 'Category', options: ['Food', 'Sport', 'Beauty']},
      {label: 'Tag', options: ['Pizza', 'Sushi', 'Barbershop', 'Swimm pool']},
      {label: 'Vendor', options: ['Garage', 'Best Beauty Center', 'GYM24']},
    ];
  }

  ngOnInit(): void {
  }

}
