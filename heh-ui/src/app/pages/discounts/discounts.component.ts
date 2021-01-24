import { Component, OnInit } from '@angular/core';

interface InterfaceForMultySelComponent {
  label: string;
  firstViewData: string[];
  allDataForSelect: string[];
}
@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  InterfaceForMultySelComponent: InterfaceForMultySelComponent[];

  constructor() {
    this.InterfaceForMultySelComponent = [
      {label: 'Category', firstViewData: ['Food'], allDataForSelect: ['Food', 'Sport', 'Beauty']},
      {label: 'Tag', firstViewData: ['Pizza', 'Sushi'], allDataForSelect: ['Pizza', 'Sushi', 'Barbershop', 'Swimm pool']},
      {label: 'Vendor', firstViewData: ['Garage'], allDataForSelect: ['Garage', 'Best Beauty Center', 'GYM24']},
    ];
  }

  ngOnInit(): void {
  }

}
