import { Component, OnInit } from '@angular/core';
import { DiscountCard } from '../../models/discount-card';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor() {}

  favoriteCards: Array<DiscountCard> = [
    // {
    //   background: '90deg, #f598a8, #f6edb2',
    //   discount: {
    //     description: 'buy',
    //     addressList: ['blabla', 'blabla'],
    //     phones: ['blabla', 'blabla'],
    //     workingHours: 'string',
    //     validity: new Date(2011, 11, 11),
    //     vendorName: 'Domino\'s pizza',
    //     title: 'Buy our tasty pizza with 10% discount loafsdfasdf asdfasdfa sdfas fasdf asdfasdf asdfa sdfasdfasdf asdf asd f',
    //     feedback: 'Pepperoni pizza  is tastier with double cheese',
    //     categoryId: 'Food',
    //     tags: ['Pizza'],
    //   }
    // },
    // {
    //   background: '90deg, #cfecd0, #a0cea7, #9ec0db',
    //   discount: {
    //     description: 'buy',
    //     addressList: ['blabla', 'blabla'],
    //     phones: ['blabla', 'blabla'],
    //     workingHours: 'string',
    //     validity: new Date(2011, 11, 11),
    //     vendorName: 'Ronin',
    //     title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
    //     feedback: 'Vegeterian tofu roll is the best roll',
    //     categoryId: 'Food',
    //     tags: ['Sushi'],
    //   }
    // },
    // {
    //   background: '90deg, #faf0cd, #fab397',
    //   discount: {
    //     description: 'buy',
    //     addressList: ['blabla', 'blabla'],
    //     phones: ['blabla', 'blabla'],
    //     workingHours: 'string',
    //     validity: new Date(2011, 11, 11),
    //     vendorName: 'Pizza Tempo',
    //     title: 'Feel our love',
    //     feedback: 'coca',
    //     categoryId: 'Food',
    //     tags: ['Pizza', 'Sushi', 'Drinks'],
    //   }
    // },
    // {
    //   background: '90deg, #cfecd0, #ffc5ca',
    //   discount: {
    //     description: 'buy',
    //     addressList: ['blabla', 'blabla'],
    //     phones: ['blabla', 'blabla'],
    //     workingHours: 'string',
    //     validity: new Date(2011, 11, 11),
    //     vendorName: 'Mango',
    //     title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
    //     feedback: 'Vegeterian tofu roll is the best roll',
    //     categoryId: 'Clothes',
    //   }
    // },
    // {
    //   background: '90deg, #aea4e3, #d3ffe8',
    //   discount: {
    //     description: 'buy',
    //     addressList: ['blabla', 'blabla'],
    //     phones: ['blabla', 'blabla'],
    //     workingHours: 'string',
    //     validity: new Date(2011, 11, 11),
    //     vendorName: 'Papa Johns',
    //     title: 'Buy our tasty pizza with 20% discount loafsdfasdf asdfasdfa sdfas fasdf asdfasdf asdfa sdfasdfasdf asdf asd f',
    //     feedback: 'Chicken Ranch',
    //     categoryId: 'Food',
    //     tags: ['Pizza'],
    //   }
    // },
    // {
    //   background: '90deg, #69b7eb, #b3dbd3, #f4d6db',
    //   discount: {
    //     description: 'buy',
    //     addressList: ['blabla', 'blabla'],
    //     phones: ['blabla', 'blabla'],
    //     workingHours: 'string',
    //     validity: new Date(2011, 11, 11),
    //     vendorName: 'Mango',
    //     title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
    //     feedback: 'Vegeterian tofu roll is the best roll',
    //     categoryId: 'Clothes',
    //   }
    // },
    // {
    //   background: '90deg, #aea4e3, #d3ffe8',
    //   discount: {
    //     description: 'buy',
    //     addressList: ['blabla', 'blabla'],
    //     phones: ['blabla', 'blabla'],
    //     workingHours: 'string',
    //     validity: new Date(2011, 11, 11),
    //     vendorName: 'Zara rgergher ergerger fff',
    //     title: 'Feel the taste of the holiday with Coca-Cola!',
    //     feedback: 'Vegeterian tofu roll is the best roll',
    //     categoryId: 'Clothes',
    //   }
    // },
    // {
    //   background: '90deg, #cfecd0, #ffc5ca',
    //   discount: {
    //     description: 'buy',
    //     addressList: ['blabla', 'blabla'],
    //     phones: ['blabla', 'blabla'],
    //     workingHours: 'string',
    //     validity: new Date(2011, 11, 11),
    //     vendorName: 'KFC',
    //     title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
    //     feedback: 'Vegeterian tofu roll is the best roll',
    //     categoryId: 'Food',
    //     tags: ['Pizza', 'Drinks', ],
    //   }
    // },
    // {
    //   background: '90deg, #69b7eb, #b3dbd3, #f4d6db',
    //   discount: {
    //     description: 'buy',
    //     addressList: ['blabla', 'blabla'],
    //     phones: ['blabla', 'blabla'],
    //     workingHours: 'string',
    //     validity: new Date(2011, 11, 11),
    //     vendorName: 'Pizza Tempo',
    //     title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
    //     feedback: 'Vegeterian tofu roll is the best roll',
    //     categoryId: 'Food',
    //     tags: ['Pizza'],
    //   }
    // },
    // {
    //   background: '90deg, #69b7eb, #b3dbd3, #f4d6db',
    //   discount: {
    //     description: 'buy',
    //     addressList: ['blabla', 'blabla'],
    //     phones: ['blabla', 'blabla'],
    //     workingHours: 'string',
    //     validity: new Date(2011, 11, 11),
    //     vendorName: 'Papa Johns',
    //     title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
    //     feedback: 'Vegeterian tofu roll is the best roll',
    //     categoryId: 'Food',
    //     tags: ['Pizza'],
    //   }
    // },
  ];

  ngOnInit(): void {
  }
}
