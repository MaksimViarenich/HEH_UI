import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiscountDetailsModalComponent } from './discount-details-modal/discount-details-modal.component';
import { DiscountCard } from '../../models/discount-card';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  discounts: Array<object> = [
    {
      background: '../../../assets/images/card-backgrounds/bg-vendor-green.png',
      discount: {
        vendor: 'Domino\'s Pizza TEST',
        title: 'Buy our tasty pizza with 10% discount',
        category: 'Food',
        tags: ['Pizza', ],
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
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-vendor-blue.png',
      discount: {
        vendor: 'Terra Marre',
        title: 'Our restaurant gives you 15% discount',
        category: 'Food',
        tags: ['Pizza', 'Pasta', 'Focaccia' ],
        description: 'Discount available 24/7 for all our pizzas. 10% for weekdays 15% for weekends',
        addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
          'Belarus, Minsk, Lenina street, 25',
          'Ukraine, Vinnytsia, Sverdlova street, 1a',
          'Belarus, Minsk, Skryganova street, 48',
          'Belarus, Minsk, Molodezhnaya street, 11',
          'Belarus, Minsk, Esenina street, 5'],
        website: 'https://www.dominos.by',
        phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
        workingHours: '06:00 - 23:00',
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-vendor-orange.png',
      discount: {
        vendor: 'Contenintal Barbrshop',
        title: 'Improve your look with our 20% discount',
        category: 'Beaty',
        tags: ['Barbershop', ],
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
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-vendor-orange.png',
      discount: {
        vendor: 'Contenintal Barbrshop',
        title: 'Improve your look with our 20% discount',
        category: 'Beaty',
        tags: ['Barbershop', ],
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
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-vendor-orange.png',
      discount: {
        vendor: 'Contenintal Barbrshop',
        title: 'Improve your look with our 20% discount',
        category: 'Beaty',
        tags: ['Barbershop', ],
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
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-vendor-orange.png',
      discount: {
        vendor: 'Contenintal Barbrshop',
        title: 'Improve your look with our 20% discount',
        category: 'Beaty',
        tags: ['Barbershop', ],
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
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-vendor-orange.png',
      discount: {
        vendor: 'Contenintal Barbrshop',
        title: 'Improve your look with our 20% discount',
        category: 'Beaty',
        tags: ['Barbershop', ],
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
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-vendor-orange.png',
      discount: {
        vendor: 'Contenintal Barbrshop',
        title: 'Improve your look with our 20% discount',
        category: 'Beaty',
        tags: ['Barbershop', ],
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
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-vendor-orange.png',
      discount: {
        vendor: 'Contenintal Barbrshop',
        title: 'Improve your look with our 20% discount',
        category: 'Beaty',
        tags: ['Barbershop', ],
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
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
      }
    },
  ];


  openDiscountDetails(discount: object): void {
    const dialogRef = this.dialog.open(DiscountDetailsModalComponent, {data: discount});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

}
