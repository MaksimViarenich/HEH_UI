import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {VendorCard} from '../../../models/vendor-card';
import {ModalService} from '../../../services/modal-service/modal.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})

export class VendorsComponent implements OnInit {
  constructor(public dialog: MatDialog,
              private modalService: ModalService) {
  }

  list: Array<VendorCard> = [
    // {
    //   background: '90deg, #f598a8, #f6edb2',
    //   vendor: {
    //     name: 'Dominos Pizza',
    //     addressList: ['Belarus, Minsk, Komsomolskaya street, 3',
    //       'Belarus, Minsk, Lenina street, 25',
    //       'Belarus, Minsk, Sverdlova street, 1a',
    //       'Belarus, Minsk, Skryganova street, 48',
    //       'Belarus, Minsk, Molodezhnaya street, 11',
    //       'Belarus, Minsk, Esenina street, 5'],
    //     website: 'https://www.dominos.by',
    //     phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
    //     workingHours: '06:00 - 23:00',
    //     instagram: 'Inst',
    //     facebook: 'Facebook',
    //     vk: 'VK',
    //     isReceiveNotificationsAllowed: true,
    //     discounts: [
    //       {
    //         vendorName: 'Domino\'s Pizza',
    //         title: 'Buy our tasty pizza with 10% discount sdfsd fsd fsdfsd fsdfsdfsdf sdf sdfsdfsdfsd sd fsdfsdf sdf sdfsdfsdf sd',
    //         categoryId: 'Food',
    //         tags: ['Pizza'],
    //         description: 'Discount available 24/7 for all our pizzas. 10% for weekdays 15% for weekends',
    //         addressList: [
    //           'Belarus, Minsk, Komsomolskaya street, 3',
    //           'Belarus, Minsk, Lenina street, 25'],
    //         website: 'https://www.dominos.by',
    //         phones: ['7717', '(029) 750-37-16', '(044) 750-37-16'],
    //         workingHours: '06:00 - 23:00',
    //         validity: new Date(2021, 11, 31),
    //         instagram: 'https://www.instagram.com/',
    //         facebook: 'https://www.facebook.com/',
    //         vk: 'https://vk.com/',
    //         startDate: new Date(),
    //       },
    //     ]
    //   }
    // }
  ];

  openVendorModal(data?: VendorCard): void {
    this.modalService.openVendorModal(data);
  }

  ngOnInit(): void {
  }
}
