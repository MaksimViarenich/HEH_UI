import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiscountCard } from '../../../models/discount-card';
import { SearchOptions } from '../../../models/search-options';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  searchFieldsOptions: SearchOptions;

  constructor(public dialog: MatDialog) {
    this.searchFieldsOptions = {
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
  discounts: Array<DiscountCard> = [
    {
      background: '../../../assets/images/card-backgrounds/bg-vendor-green.png',
      discount: {
        vendor: 'Domino\'s Pizza',
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
        views: 223,
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-vendor-blue.png',
      discount: {
        vendor: 'Terra Marre',
        title: 'Our restaurant gives you 15%',
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
        views: 158,
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-vendor-orange.png',
      discount: {
        vendor: 'Contenintal Barbrshop',
        title: 'Improve your look with our 20% discount',
        category: 'Beaty',
        tags: ['Barbershop', ],
        description: 'Use discount 20% 24/7, 25% on holidays',
        addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
          'Ukraine, Vinnytsia, Soborna street, 14',
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
        views: 99,
      }
    },
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
        website: 'https://www.dominos.by',
        phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
        workingHours: '06:00 - 23:00',
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
        views: 45,
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
        website: 'https://www.dominos.by',
        phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
        workingHours: '06:00 - 23:00',
        validity: new Date(2021, 11, 31),
        instagram: 'https://www.instagram.com/',
        facebook: 'https://www.facebook.com/',
        vk: 'https://vk.com/',
        views: 445,
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
  ngOnInit(): void {
  }

}
