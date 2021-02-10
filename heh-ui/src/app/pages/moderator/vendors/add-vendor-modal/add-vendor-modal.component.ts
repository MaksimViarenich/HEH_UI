import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VendorCard } from '../../../../models/vendor-card';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Discount } from '../../../../models/discount';
import { ModalService } from '../../../../services/modal-service/modal.service';
import { VendorService } from '../vendor.service';
import { Phones } from 'src/app/models/phones';
import { Address } from '../../../../models/address';

@Component({
  selector: 'app-vendor-modal',
  templateUrl: './add-vendor-modal.component.html',
  styleUrls: ['./add-vendor-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddVendorModalComponent implements OnInit {
  vendor: any;
  links: any;

  get vendorPhones(): string[] {
    return this.vendor.phones ?
      this.vendor.phones.map((phone: Phones) => phone.number) : [];
  }

  get vendorAddresses(): string[] {
    return this.vendor.addresses ?
      this.vendor.addresses.map((address: Address) => address.street) : [];
  }

  constructor(
    public vendorService: VendorService,
    public dialog: MatDialog,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public vendorForId: VendorCard
  ) {
    this.vendor = {};
    this.links = {
      website: '',
      instagram: '',
      facebook: '',
      vkontakte: '',
    };
  }

  vendorName = new FormControl();

  addressTitle = 'vendors.add-vendor.address';
  phoneTitle = 'vendors.add-vendor.phone';

  openDiscountModal(discount?: Discount): void {
    this.modalService.openAddDiscountModal(discount, this.vendor);
  }


  onAddPhone(phoneNumber: string): void {
    this.vendor.phones.push({
      number: phoneNumber
    });
  }

  onDeletePhone(idx: number): void {
    this.vendor.phones.splice(idx, 1);
  }

  onAddAddress(address: any): void {
    this.vendor.addresses.push({
      id: '',
      countryId: 'countryId',
      cityId: 'cityId',
      street: address.address.street,
    });
    console.log(this.vendor.addresses);
  }

  onDeleteAddress(idx: number): void {
    this.vendor.addresses.splice(idx, 1);
  }

  ngOnInit(): void {
    if (this.vendorForId.id) {
      this.vendorService.getVendorDetail(this.vendorForId.id).subscribe(
        (data) => {
          this.vendor = data;

          if (data.links.length) {
            this.links = Object.assign({}, ...data.links.map((link: any) => {
              return {
                [link.type.toLowerCase()]: link.url
              };
            }));
          }
        }
      );
    }
  }
}
