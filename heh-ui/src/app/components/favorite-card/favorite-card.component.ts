import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FavoriteCardComponent implements OnInit {

  bgVendor: string = '../../../assets/images/card-backgrounds/bg-vendor-green.PNG';
  discountVendorName: string = 'Domino\'s pizza';
  discountName: string = 'Buy our tasty pizza with 10% discount loafsdfasdf asdfasdfa sdfas fasdf asdfasdf asdfa sdfasdfasdf asdf asd f';
  discountNote: string = 'Pepperoni pizza  is tastier with double cheese';
  discountCategory: string = 'Food';

  //Mught be an array
  discountTag: string = 'Pizza';

  constructor() { }

  ngOnInit(): void {
  }
}