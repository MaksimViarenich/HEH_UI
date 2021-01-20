import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discount-card',
  templateUrl: './discount-card.component.html',
  styleUrls: ['./discount-card.component.scss']
})
export class DiscountCardComponent implements OnInit {
  discountVendorName: string = `Domino's pizza`;
  discountName: string = `Buy our tasty pizza with 10% discount loafsdfasdf asdfasdfa sdfas fasdf asdfasdf asdfa sdfasdfasdf asdf asd f`;
  bgVendor: string = '../../../assets/images/card-backgrounds/bg-vendor-green.PNG';
  discountCategory: string = `Food`;

  //Mught be an array
  discountTag: string = `Pizza`;

  constructor() { }

  ngOnInit(): void {
  }

}
