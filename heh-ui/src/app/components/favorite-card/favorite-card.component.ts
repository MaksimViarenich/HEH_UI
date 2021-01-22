import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss']
})
export class FavoriteCardComponent implements OnInit {

  bgVendor: string = '../../../assets/images/card-backgrounds/bg-vendor-green.PNG';
  discountVendorName: string = 'Domino\'s pizza';
  discountName: string = 'Buy our tasty pizza with 10% discount loafsdfasdf asdfasdfa sdfas fasdf asdfasdf asdfa sdfasdfasdf asdf asd f';
  discountNote: string = 'Note: Pepperoni pizza  is tastier with double cheese jfjs  fjsfjs skdfjksdjf ks skdfjklsd ljsdfj lsdjf l sljsdflj lsdfljjsd lsdfkljsfj ljlsdjflsj asdfasdfasdfa sdf asdfas fasdfasdf asfasfasdfadf asdf asfas fasfasdfasd fasf a fas asdf fl';
  discountCategory: string = 'Food';

  //Mught be an array
  discountTag: string = 'Pizza';

  constructor() { }

  ngOnInit(): void {
  }

}
