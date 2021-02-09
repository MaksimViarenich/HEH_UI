import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Vendor} from '../../../../models/vendor';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Discount} from '../../../../models/discount';
import {ModalService} from '../../../../services/modal-service/modal.service';
import { VendorService } from '../vendor.service';
import { Link } from 'src/app/models/link';
import { Phones } from 'src/app/models/phones';
import { Address } from '../../../../models/address';

@Component({
  selector: 'app-vendor-modal',
  templateUrl: './add-vendor-modal.component.html',
  styleUrls: ['./add-vendor-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddVendorModalComponent implements OnInit {
  vendorDetail: any;
  vendorLinks: Array<Link>;
  vk: string;
  inst: string;
  facebook: string;
  website: string;

  get vendorDetailPhones(): string[] {
    return this.vendorDetail.phones ?
      this.vendorDetail.phones.map((phone: Phones) => phone.number) : [];
  }

  get vendorDetailAddresses(): string[] {
    return this.vendorDetail.addresses ?
      this.vendorDetail.addresses.map((address: Address) => address.street) : [];
  }

  constructor(
    public vendorService: VendorService,
    public dialog: MatDialog,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public vendorForId: Vendor
  ) {
    this.vendorDetail = {};
    this.vendorLinks = this.vendorDetail.links;
    this.vk = '';
    this.inst = '';
    this. facebook = '';
    this.website = '';
  }

  vendorName = new FormControl();

  addressTitle = 'vendors.add-vendor.address';
  phoneTitle = 'vendors.add-vendor.phone';

  openDiscountModal(discount?: Discount): void {
    this.modalService.openAddDiscountModal(discount, this.vendorDetail);
  }

  getSocial(): any {
    console.log(this.vendorLinks);
    this.vendorLinks.forEach(item => {
      switch (item.type) {
        case 'Vkontakte':
          this.vk = item.url;
          break;
        case 'Instagram':
          this.inst = item.url;
          break;
        case 'Facebook':
          this.facebook = item.url;
          break;
        case 'Website':
          this.website = item.url;
          break;
      }
    });
  }

  onAddPhone(phoneNumber: string): void {
    this.vendorDetail.phones.push({
      number: phoneNumber
    });
  }

  onDeletePhone(idx: number): void {
    this.vendorDetail.phones.splice(idx, 1);
  }

  onAddAddress(street: string): void {
    this.vendorDetail.addresses.push({
      street
    });
  }

  onDeleteAddress(idx: number): void {
    this.vendorDetail.addresses.splice(idx, 1);
  }

  ngOnInit(): void {
    if (this.vendorForId.id) {
      this.vendorService.getVendorDetail(this.vendorForId.id).subscribe(
        (data) => {
          this.vendorDetail = data;
          this.vendorLinks = this.vendorDetail.links;
          this.getSocial();
        }
      );
    }
  }
}
