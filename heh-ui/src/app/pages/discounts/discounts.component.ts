import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatSidenav} from '@angular/material/sidenav';
import { Service } from 'src/app/models/service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  address = new FormControl();

  service: Service = {
    vendor: 'Domino\'s Pizza',
    title: 'Buy our tasty pizza with 10% discount',
    category: 'Food',
    tags: ['Pizza'],
    description: 'Discount available 24/7 for all our pizzas. 10% for weekdays 15% for weekends',
    addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
      'Belarus, Minsk, Lenina street, 25',
      'Belarus, Minsk, Sverdlova street, 1a',
      'Belarus, Minsk, Skryganova street, 48',
      'Belarus, Minsk, Molodezhnaya street, 11',
      'Belarus, Minsk, Esenina street, 5'],
    website: 'https://www.dominos.by',
    phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
    workingHours: '06:00 - 23:00',
    validity: '12/06/21',
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    vk: 'https://vk.com/',
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
