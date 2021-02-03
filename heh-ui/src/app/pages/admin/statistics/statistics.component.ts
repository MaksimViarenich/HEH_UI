import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchOptions } from '../../../models/search-options';
import { VendorCard } from '../../../models/vendor-card';

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
        name: 'Domino\'s Pizza',
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
        views: 450,
      },
    },
    {
      background: '90deg, #cfecd0, #a0cea7, #9ec0db',
      vendor: {
        name: 'Tera Mare',
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
        views: 398,
      },
    },
    {
      background: '90deg, #faf0cd, #fab397',
      vendor: {
        name: 'Continental Barbershop',
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
        views: 123,
      },
    },
    {
      background: '90deg, #cfecd0, #ffc5ca',
      vendor: {
        name: 'West Coast Customs',
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
        views: 76,
      },
    },
  ];

  ngOnInit(): void {
  }

}
