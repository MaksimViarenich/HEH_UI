import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favoriteCards: Array<object> = [
    {
      bgVendor: '../../../assets/images/card-backgrounds/bg-vendor-green.PNG',
      discount: {
        vendor: 'Domino\'s pizza',
        title: 'Buy our tasty pizza with 10% discount loafsdfasdf asdfasdfa sdfas fasdf asdfasdf asdfa sdfasdfasdf asdf asd f',
        feedback: 'Pepperoni pizza  is tastier with double cheese',
        category: 'Food',
        tags: ['Pizza'],
      }
    },
    {
      bgVendor: '../../../assets/images/card-backgrounds/bg-vendor-violet.PNG',
      discount: {
        vendor: 'Ronin',
        title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
        feedback: 'Vegeterian tofu roll is the best roll',
        category: 'Food',
        tags: ['Sushi'],
      }
    },
    {
      bgVendor: '../../../assets/images/card-backgrounds/bg-vendor-blue.PNG',
      discount: {
        vendor: 'Pizza Tempo',
        title: 'Feel our love',
        feedback: 'coca',
        category: 'Food',
        tags: ['Pizza', 'Sushi', 'Drinks'],
      }
    },
    {
      bgVendor: '../../../assets/images/card-backgrounds/bg-vendor-red.PNG',
      discount: {
        vendor: 'Mango',
        title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
        feedback: 'Vegeterian tofu roll is the best roll',
        category: 'Clothes',
      }
    },
    {
      bgVendor: '../../../assets/images/card-backgrounds/bg-vendor-pink.PNG',
      discount: {
        vendor: 'Papa Johns',
        title: 'Buy our tasty pizza with 20% discount loafsdfasdf asdfasdfa sdfas fasdf asdfasdf asdfa sdfasdfasdf asdf asd f',
        feedback: 'Chicken Ranch',
        category: 'Food',
        tags: ['Pizza'],
      }
    },
    {
      bgVendor: '../../../assets/images/card-backgrounds/bg-vendor-orange.PNG',
      discount: {
        vendor: 'Mango',
        title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
        feedback: 'Vegeterian tofu roll is the best roll',
        category: 'Clothes',
      }
    },
    {
      bgVendor: '../../../assets/images/card-backgrounds/bg-vendor-red.PNG',
      discount: {
        vendor: 'Zara rgergher ergerger fff',
        title: 'Feel the taste of the holiday with Coca-Cola!',
        feedback: 'Vegeterian tofu roll is the best roll',
        category: 'Clothes',
      }
    },
    {
      bgVendor: '../../../assets/images/card-backgrounds/bg-vendor-violet.PNG',
      discount: {
        vendor: 'KFC',
        title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
        feedback: 'Vegeterian tofu roll is the best roll',
        category: 'Food',
        tags: ['Pizza', 'Drinks',],
      }
    },
    {
      bgVendor: '../../../assets/images/card-backgrounds/bg-vendor-green.PNG',
      discount: {
        vendor: 'Pizza Tempo',
        title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
        feedback: 'Vegeterian tofu roll is the best roll',
        category: 'Food',
        tags: ['Pizza'],
      }
    },
    {
      bgVendor: '../../../assets/images/card-backgrounds/bg-vendor-blue.PNG',
      discount: {
        vendor: 'Papa Johns',
        title: 'Feel the taste of the holiday with Coca-Cola! sdfasdfasdf asdf asd f',
        feedback: 'Vegeterian tofu roll is the best roll',
        category: 'Food',
        tags: ['Pizza'],
      }
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
