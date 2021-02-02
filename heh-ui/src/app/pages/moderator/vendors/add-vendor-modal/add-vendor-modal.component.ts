import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Vendor} from '../../../../models/vendor';
import {MatDialog} from '@angular/material/dialog';
import {AddDiscountModalComponent} from '../add-discount-modal/add-discount-modal.component';
import {DiscountCard} from '../../../../models/discount-card';

@Component({
  selector: 'app-vendor-modal',
  templateUrl: './add-vendor-modal.component.html',
  styleUrls: ['./add-vendor-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddVendorModalComponent implements OnInit {
  vendor = new FormControl();
  phone = new FormControl();
  site = new FormControl();
  hours = new FormControl();
  instagram = new FormControl();
  vkontakte = new FormControl();
  facebook = new FormControl();
  addressTitle = 'Address';
  phoneTitle = 'Phone';

  discounts: Array<DiscountCard> = [
    {
      background: '../../../assets/images/card-backgrounds/bg-purple.png',
      discount: {
        vendor: 'West Coast Customs',
        title: 'We gonna pimp your ride for 7% cheaper bro',
        category: 'Cars',
        tags: ['Tuning', ],
        description: 'Visit us at weekdays',
        addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
          'Belarus, Minsk, Lenina street, 25',
          'Belarus, Minsk, Sverdlova street, 1a',
          'Belarus, Minsk, Skryganova street, 48',
          'Belarus, Minsk, Molodezhnaya street, 11',
          'Belarus, Minsk, Esenina street, 5'],
        website: 'https://www.westcoastcustoms.com',
        phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
        workingHours: '06:00 - 23:00',
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-lightblue.png',
      discount: {
        vendor: 'Gamestop',
        title: 'Play more, pay less with 10%',
        category: 'Free time',
        tags: ['Games', ],
        description: 'Discount available 24/7 for all our pizzas. 10% for weekdays 15% for weekends',
        addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
          'Belarus, Minsk, Lenina street, 25',
          'Belarus, Minsk, Sverdlova street, 1a',
          'Belarus, Minsk, Skryganova street, 48',
          'Belarus, Minsk, Molodezhnaya street, 11',
          'Belarus, Minsk, Esenina street, 5'],
        website: 'http://gamestop.ua',
        phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
        workingHours: '06:00 - 23:00',
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-red.png',
      discount: {
        vendor: 'KFC',
        title: '15% discount for our crispy chicken',
        category: 'Food',
        tags: ['KFC', ],
        description: 'Discount available 24/7 for all orders.',
        addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
          'Belarus, Minsk, Lenina street, 25',
          'Belarus, Minsk, Sverdlova street, 1a',
          'Belarus, Minsk, Skryganova street, 48',
          'Belarus, Minsk, Molodezhnaya street, 11',
          'Belarus, Minsk, Esenina street, 5'],
        website: 'https://www.kfc.by',
        phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
        workingHours: '06:00 - 23:00',
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-magenta.png',
      discount: {
        vendor: 'McDonald\'s',
        title: 'Improve your look with our 20% discount',
        category: 'Food',
        tags: ['McDonald\'s'],
        description: 'Discount available 24/7 for all orders.',
        addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
          'Belarus, Minsk, Lenina street, 25',
          'Belarus, Minsk, Sverdlova street, 1a',
          'Belarus, Minsk, Skryganova street, 48',
          'Belarus, Minsk, Molodezhnaya street, 11',
          'Belarus, Minsk, Esenina street, 5'],
        website: 'https://www.mcdonalds.com',
        phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
        workingHours: '06:00 - 23:00',
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
      }
    },
  ];

  discount: Vendor = {
    vendor: 'Domino\'s Pizza',
    title: 'Buy our tasty pizza with 10% discount',
    category: 'Food',
    tags: ['Pizza'],
    description:
      'Discount available 24/7 for all our pizzas. 10% for weekdays 15% for weekends',
    addressList: [
      'Belarus, Minsk, Komsomolskaya street, 3',
      'Belarus, Minsk, Lenina street, 25',
      'Belarus, Minsk, Sverdlova street, 1a',
      'Belarus, Minsk, Skryganova street, 48',
      'Belarus, Minsk, Molodezhnaya street, 11',
      'Belarus, Minsk, Esenina street, 5',
    ],
    website: 'https://www.dominos.by',
    phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
    workingHours: '06:00 - 23:00',
    validity: new Date(2021, 11, 31),
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    vk: 'https://vk.com/',
  };

  constructor(public dialog: MatDialog) {}

  openAddDiscount(): void {
    const dialogRef = this.dialog.open(AddDiscountModalComponent, {
      panelClass: 'add-discount-modal'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }
}
