import { Component, OnInit } from '@angular/core';
import { DiscountCard } from '../../models/discount-card';
import { SearchOptions } from '../../models/search-options';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  searchFieldsOptions: SearchOptions;

  constructor() {
    this.searchFieldsOptions = {
      selectOptions: {
        label: 'Location',
        options: [
          {value: '1', viewValue: 'Belarus, Minsk'},
          {value: '2', viewValue: 'Belarus, Grodno'},
          {value: '3', viewValue: 'Ukraine, Vinnitsa'},
          {value: '4', viewValue: 'Ukraine, Kiev'},
        ]
      },
      multiSelectOptions: [
        {
          label: 'Category',
          options: [
            {value: '5', viewValue: 'Food'},
            {value: '6', viewValue: 'Sport'},
            {value: '7', viewValue: 'Beauty'},
            {value: '8', viewValue: 'Clothes'}
          ]
        },
        {
          label: 'Tag',
          options: [
            {value: '9', viewValue: 'Pizza'},
            {value: '10', viewValue: 'Sushi'},
            {value: '11', viewValue: 'Barbershop'},
            {value: '12', viewValue: 'Swimming pool'},
          ]
        },
        {
          label: 'Vendor',
          options: [
            {value: '13', viewValue: 'Garage'},
            {value: '14', viewValue: 'Best Beauty Center'},
            {value: '15', viewValue: 'GYM24'}
          ]
        },
      ]
    };
  }

  favoriteCards: Array<DiscountCard> = [
    {
      background: '../../../assets/images/card-backgrounds/bg-yellow.png',
      discount: {
        description: 'buy',
        addressList: ['blabla', 'blabla'],
        phones: ['blabla', 'blabla'],
        workingHours: 'string',
        validity: new Date(2011, 11, 11),
        vendor: 'Domino\'s pizza',
        title: 'Buy our tasty pizza with 10% discount loafsdfasdf asdfasdfa sdfas fasdf asdfasdf asdfa sdfasdfasdf asdf asd f',
        feedback: 'Pepperoni pizza  is tastier with double cheese',
        category: 'Food',
        tags: ['Pizza'],
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-violet.png',
      discount: {
        description: 'buy',
        addressList: ['blabla', 'blabla'],
        phones: ['blabla', 'blabla'],
        workingHours: 'string',
        validity: new Date(2011, 11, 11),
        vendor: 'Ronin',
        title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
        feedback: 'Vegeterian tofu roll is the best roll',
        category: 'Food',
        tags: ['Sushi'],
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-red.png',
      discount: {
        description: 'buy',
        addressList: ['blabla', 'blabla'],
        phones: ['blabla', 'blabla'],
        workingHours: 'string',
        validity: new Date(2011, 11, 11),
        vendor: 'Pizza Tempo',
        title: 'Feel our love',
        feedback: 'coca',
        category: 'Food',
        tags: ['Pizza', 'Sushi', 'Drinks'],
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-yellow-green.png',
      discount: {
        description: 'buy',
        addressList: ['blabla', 'blabla'],
        phones: ['blabla', 'blabla'],
        workingHours: 'string',
        validity: new Date(2011, 11, 11),
        vendor: 'Mango',
        title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
        feedback: 'Vegeterian tofu roll is the best roll',
        category: 'Clothes',
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-pink-purple.png',
      discount: {
        description: 'buy',
        addressList: ['blabla', 'blabla'],
        phones: ['blabla', 'blabla'],
        workingHours: 'string',
        validity: new Date(2011, 11, 11),
        vendor: 'Papa Johns',
        title: 'Buy our tasty pizza with 20% discount loafsdfasdf asdfasdfa sdfas fasdf asdfasdf asdfa sdfasdfasdf asdf asd f',
        feedback: 'Chicken Ranch',
        category: 'Food',
        tags: ['Pizza'],
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-orange.png',
      discount: {
        description: 'buy',
        addressList: ['blabla', 'blabla'],
        phones: ['blabla', 'blabla'],
        workingHours: 'string',
        validity: new Date(2011, 11, 11),
        vendor: 'Mango',
        title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
        feedback: 'Vegeterian tofu roll is the best roll',
        category: 'Clothes',
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-red.png',
      discount: {
        description: 'buy',
        addressList: ['blabla', 'blabla'],
        phones: ['blabla', 'blabla'],
        workingHours: 'string',
        validity: new Date(2011, 11, 11),
        vendor: 'Zara rgergher ergerger fff',
        title: 'Feel the taste of the holiday with Coca-Cola!',
        feedback: 'Vegeterian tofu roll is the best roll',
        category: 'Clothes',
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-violet.png',
      discount: {
        description: 'buy',
        addressList: ['blabla', 'blabla'],
        phones: ['blabla', 'blabla'],
        workingHours: 'string',
        validity: new Date(2011, 11, 11),
        vendor: 'KFC',
        title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
        feedback: 'Vegeterian tofu roll is the best roll',
        category: 'Food',
        tags: ['Pizza', 'Drinks', ],
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-green.png',
      discount: {
        description: 'buy',
        addressList: ['blabla', 'blabla'],
        phones: ['blabla', 'blabla'],
        workingHours: 'string',
        validity: new Date(2011, 11, 11),
        vendor: 'Pizza Tempo',
        title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
        feedback: 'Vegeterian tofu roll is the best roll',
        category: 'Food',
        tags: ['Pizza'],
      }
    },
    {
      background: '../../../assets/images/card-backgrounds/bg-blue.png',
      discount: {
        description: 'buy',
        addressList: ['blabla', 'blabla'],
        phones: ['blabla', 'blabla'],
        workingHours: 'string',
        validity: new Date(2011, 11, 11),
        vendor: 'Papa Johns',
        title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
        feedback: 'Vegeterian tofu roll is the best roll',
        category: 'Food',
        tags: ['Pizza'],
      }
    },
  ];

  ngOnInit(): void {
  }
}
