import { DiscountsService } from './discounts.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Discount } from '../../models/discount';
import { SearchOptions } from '../../models/search-options';
import { ModalService } from '../../services/modal-service/modal.service';
import { FiltersService } from './filters.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  searchFieldsOptions: SearchOptions;

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private filtersService: FiltersService,
              private discountService: DiscountsService) {
    this.searchFieldsOptions = {
      selectOptions: {
        label: 'search.location',
        options: []
      },
      multiSelectOptions: [
        {
          label: 'search.category',
          options: []
        },
        {
          label: 'search.tag',
          options: []
        },
        {
          label: 'search.vendor',
          options: [
            // {value: '11', viewValue: 'Garage'},
            // {value: '12', viewValue: 'Best Beauty Center'},
            // {value: '13', viewValue: 'GYM24'}
          ]
        },
      ]
    };
  }

  discounts: Array<Discount> = [];
  //   {
  //     background: '90deg, #f598a8, #f6edb2',
  //     discount: {
  //       vendorName: 'Domino\'s Pizza',
  //       title: 'Buy our tasty pizza with 10% discount sdfsd fsd fsdfsd fsdfsdfsdf sdf sdfsdfsdfsd sd fsdfsdf sdf sdfsdfsdf sd',
  //       category: 'Food',
  //       tags: ['Pizza', ],
  //       description: 'Discount available 24/7 for all our pizzas. 10% for weekdays 15% for weekends',
  //       addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
  //         'Belarus, Minsk, Lenina street, 25',
  //         'Belarus, Minsk, Sverdlova street, 1a',
  //         'Belarus, Minsk, Skryganova street, 48',
  //         'Belarus, Minsk, Molodezhnaya street, 11',
  //         'Belarus, Minsk, Esenina street, 5'],
  //       website: 'https://www.dominos.by',
  //       phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
  //       workingHours: '06:00 - 23:00',
  //       validity: new Date(2021, 11, 31),
  //       instagram: 'https://www.instagram.com/',
  //       facebook: 'https://www.facebook.com/',
  //       vk: 'https://vk.com/',
  //     }
  //   },
  //   {
  //     background: '90deg, #cfecd0, #a0cea7, #9ec0db',
  //     discount: {
  //       vendorName: 'Tera Mare',
  //       title: 'Our restaurant gives you 15%',
  //       category: 'Food',
  //       tags: ['Pizza', 'Pasta', 'Focaccia' ],
  //       description: 'Discount available 24/7 for all our pizzas. 10% for weekdays 15% for weekends',
  //       addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
  //         'Belarus, Minsk, Lenina street, 25',
  //         'Ukraine, Vinnytsia, Sverdlova street, 1a',
  //         'Belarus, Minsk, Skryganova street, 48',
  //         'Belarus, Minsk, Molodezhnaya street, 11',
  //         'Belarus, Minsk, Esenina street, 5'],
  //       website: 'https://terramare.vn.ua',
  //       phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
  //       workingHours: '06:00 - 23:00',
  //       validity: new Date(2021, 11, 31),
  //       instagram: 'https://www.instagram.com/',
  //       facebook: 'https://www.facebook.com/',
  //       vk: 'https://vk.com/',
  //     }
  //   },
  //   {
  //     background: '90deg, #faf0cd, #fab397',
  //     discount: {
  //       vendorName: 'Continental Barbershop',
  //       title: 'Improve your look with our 20% discount',
  //       category: 'Beaty',
  //       tags: ['Barbershop', ],
  //       description: 'Use discount 20% 24/7, 25% on holidays',
  //       addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
  //         'Ukraine, Vinnytsia, Soborna street, 14',
  //         'Belarus, Minsk, Sverdlova street, 1a',
  //         'Belarus, Minsk, Skryganova street, 48',
  //         'Belarus, Minsk, Molodezhnaya street, 11',
  //         'Belarus, Minsk, Esenina street, 5'],
  //       website: 'https://continental.vn.ua',
  //       phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
  //       workingHours: '06:00 - 23:00',
  //       validity: new Date(2021, 11, 31),
  //       instagram: 'https://www.instagram.com/',
  //       facebook: 'https://www.facebook.com/',
  //       vk: 'https://vk.com/',
  //     }
  //   },
  //   {
  //     background: '90deg, #cfecd0, #ffc5ca',
  //     discount: {
  //       vendorName: 'West Coast Customs',
  //       title: 'We gonna pimp your ride for 7% cheaper bro',
  //       category: 'Cars',
  //       tags: ['Tuning', ],
  //       description: 'Visit us at weekdays',
  //       addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
  //         'Belarus, Minsk, Lenina street, 25',
  //         'Belarus, Minsk, Sverdlova street, 1a',
  //         'Belarus, Minsk, Skryganova street, 48',
  //         'Belarus, Minsk, Molodezhnaya street, 11',
  //         'Belarus, Minsk, Esenina street, 5'],
  //       website: 'https://www.westcoastcustoms.com',
  //       phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
  //       workingHours: '06:00 - 23:00',
  //       validity: new Date(2021, 11, 31),
  //       instagram: 'https://www.instagram.com/',
  //       facebook: 'https://www.facebook.com/',
  //       vk: 'https://vk.com/',
  //     }
  //   },
  //   {
  //     background: '90deg, #aea4e3, #d3ffe8',
  //     discount: {
  //       vendorName: 'Gamestop',
  //       title: 'Play more, pay less with 10%',
  //       category: 'Free time',
  //       tags: ['Games', ],
  //       description: 'Discount available 24/7 for all our pizzas. 10% for weekdays 15% for weekends',
  //       addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
  //         'Belarus, Minsk, Lenina street, 25',
  //         'Belarus, Minsk, Sverdlova street, 1a',
  //         'Belarus, Minsk, Skryganova street, 48',
  //         'Belarus, Minsk, Molodezhnaya street, 11',
  //         'Belarus, Minsk, Esenina street, 5'],
  //       website: 'http://gamestop.ua',
  //       phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
  //       workingHours: '06:00 - 23:00',
  //       validity: new Date(2021, 11, 31),
  //       instagram: 'https://www.instagram.com/',
  //       facebook: 'https://www.facebook.com/',
  //       vk: 'https://vk.com/',
  //     }
  //   },
  //   {
  //     background: '90deg, #69b7eb, #b3dbd3, #f4d6db',
  //     discount: {
  //       vendorName: 'KFC',
  //       title: '15% discount for our crispy chicken',
  //       category: 'Food',
  //       tags: ['KFC', 'Chicken'],
  //       description: 'Discount available 24/7 for all orders.',
  //       addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
  //         'Belarus, Minsk, Lenina street, 25',
  //         'Belarus, Minsk, Sverdlova street, 1a',
  //         'Belarus, Minsk, Skryganova street, 48',
  //         'Belarus, Minsk, Molodezhnaya street, 11',
  //         'Belarus, Minsk, Esenina street, 5'],
  //       website: 'https://www.kfc.by',
  //       phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
  //       workingHours: '06:00 - 23:00',
  //       validity: new Date(2021, 11, 31),
  //       instagram: 'https://www.instagram.com/',
  //       facebook: 'https://www.facebook.com/',
  //       vk: 'https://vk.com/',
  //     }
  //   },
  //   {
  //     background: '90deg, #cfecd0, #ffc5ca',
  //     discount: {
  //       vendorName: 'McDonald\'s',
  //       title: 'Improve your look with our 20% discount',
  //       category: 'Food',
  //       tags: ['McDonald\'s' ],
  //       description: 'Discount available 24/7 for all orders.',
  //       addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
  //         'Belarus, Minsk, Lenina street, 25',
  //         'Belarus, Minsk, Sverdlova street, 1a',
  //         'Belarus, Minsk, Skryganova street, 48',
  //         'Belarus, Minsk, Molodezhnaya street, 11',
  //         'Belarus, Minsk, Esenina street, 5'],
  //       website: 'https://www.mcdonalds.com',
  //       phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
  //       workingHours: '06:00 - 23:00',
  //       validity: new Date(2021, 11, 31),
  //       instagram: 'https://www.instagram.com/',
  //       facebook: 'https://www.facebook.com/',
  //       vk: 'https://vk.com/',
  //     }
  //   },
  // ];

  openDiscountDetails(discount: Discount): void {
    this.modalService.openDiscountDetailsModal(discount);
  }

  ngOnInit(): void {

    this.filtersService.getLocation().subscribe(
      (data) => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < data.length; i++){
          for (const city of data[i].cities){
            const optionObj = {
              value: city.id,
              viewValue: `${data[i].country}, ${city.name}`
            };
            this.searchFieldsOptions.selectOptions.options.push(optionObj);
          }
        }
      }
    );

    this.filtersService.getCategoriesTags().subscribe(
      (data) => {
        for (const category of data){
          const categoryObj = {
            value: category.id,
            viewValue: category.name
          };
          this.searchFieldsOptions.multiSelectOptions[0].options.push(categoryObj);
          for (const tag of category.tags) {
            const tagObj = {
              value: tag.id,
              viewValue: tag.name
            };
            this.searchFieldsOptions.multiSelectOptions[1].options.push(tagObj);
          }
        }
      }
    );

    this.filtersService.getVendors().subscribe(
      (data) => {
        for (const vendor of data) {
          const vendorObj = {
            value: vendor.id,
            viewValue: vendor.name
          };
          this.searchFieldsOptions.multiSelectOptions[2].options.push(vendorObj);
        }
      }
    );
    this.discountService.getDiscounts().subscribe(
      (data) => {
        this.discounts = data.value;
      }
    );
  }

}
