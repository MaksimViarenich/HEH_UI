import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DiscountCard } from '../../../models/discount-card';
import { SearchOptions } from '../../../models/search-options';
import {VendorCard} from '../../../models/vendor-card';

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
        label: 'search.location',
        options: [
          {value: '1', viewValue: 'Belarus, Minsk'},
          {value: '2', viewValue: 'Belarus, Grodno'},
          {value: '3', viewValue: 'Ukraine, Vinnitsa'}
        ]
      },
      multiSelectOptions: [
        {
          label: 'search.category',
          options: [
            {value: '4', viewValue: 'Food'},
            {value: '5', viewValue: 'Sport'},
            {value: '6', viewValue: 'Beauty'}
          ]
        },
        {
          label: 'search.tag',
          options: [
            {value: '7', viewValue: 'Pizza'},
            {value: '8', viewValue: 'Sushi'},
            {value: '9', viewValue: 'Barbershop'},
            {value: '10', viewValue: 'Swimming pool'},
          ]
        },
      ],
      dateOptions: {
        label: 'search.date-range' || ' ',
      }
    };
  }

  list: Array<VendorCard> = [
    {
      background: '90deg, #f598a8, #f6edb2',
      vendor: {
        name: 'Dominos Pizza',
        addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
          'Belarus, Minsk, Lenina street, 25',
          'Belarus, Minsk, Sverdlova street, 1a',
          'Belarus, Minsk, Skryganova street, 48',
          'Belarus, Minsk, Molodezhnaya street, 11',
          'Belarus, Minsk, Esenina street, 5'],
        website: 'https://www.dominos.by',
        phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
        workingHours: '06:00 - 23:00',
        instagram: 'Inst',
        facebook: 'Facebook',
        vk: 'VK',
        isReceiveNotificationsAllowed: true,
        discounts: [
          {
            vendorName: 'Domino\'s Pizza',
            title: 'Buy our tasty pizza with 10% discount sdfsd fsd fsdfsd fsdfsdfsdf sdf sdfsdfsdfsd sd fsdfsdf sdf sdfsdfsdf sd',
            category: 'Food',
            tags: ['Pizza' ],
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
          },
          // {
          //   vendorName: 'Domino\'s Pizza',
          //   title: 'Buy our tasty pizza with 10% discount sdfsd fsd fsdfsd fsdfsdfsdf sdf sdfsdfsdfsd sd fsdfsdf sdf sdfsdfsdf sd',
          //   category: 'Food',
          //   tags: ['Pizza' ],
          //   description: 'Discount available 24/7 for all our pizzas. 10% for weekdays 15% for weekends',
          //   addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
          //     'Belarus, Minsk, Lenina street, 25',
          //     'Belarus, Minsk, Sverdlova street, 1a',
          //     'Belarus, Minsk, Skryganova street, 48',
          //     'Belarus, Minsk, Molodezhnaya street, 11',
          //     'Belarus, Minsk, Esenina street, 5'],
          //   website: 'https://www.dominos.by',
          //   phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
          //   workingHours: '06:00 - 23:00',
          //   validity: new Date(2021, 11, 31),
          //   instagram: 'https://www.instagram.com/',
          //   facebook: 'https://www.facebook.com/',
          //   vk: 'https://vk.com/',
          //   views: 150,
          // },
        ],
      },
    },
  ];

  ngOnInit(): void {
  }

}
