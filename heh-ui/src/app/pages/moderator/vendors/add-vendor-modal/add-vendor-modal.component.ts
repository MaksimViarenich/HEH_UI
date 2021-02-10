import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VendorCard } from '../../../../models/vendor-card';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Discount } from '../../../../models/discount';
import { ModalService } from '../../../../services/modal-service/modal.service';
import { VendorService } from '../vendor.service';
import { Phones } from 'src/app/models/phones';
import { Address } from '../../../../models/address';
import { ToasterService } from '../../../../services/toaster-service/toaster.service';

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
    private toaster: ToasterService,
    @Inject(MAT_DIALOG_DATA) public vendorForId: VendorCard
  ) {
    this.vendor = {
      phones: [],
      addresses: [],
      links: [],
      discounts: []
    };
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

  addUpdateNewVendor(): void {
    this.vendor.links.push(
      {type: 'Website', url: this.links.website},
      {type: 'Instagram', url: this.links.instagram},
      {type: 'Facebook', url: this.links.facebook},
      {type: 'Vkontakte', url: this.links.vkontakte},
    );

    if (this.vendor.id) {
      this.vendorService.updateVendor(this.vendor).subscribe(
        (data) => {
          this.toaster.open('There is no possibility to add a new vendor', 'success');
        },
        (error) => {
          this.toaster.open('Vendor was updated');
        }
      );
    } else {
      this.vendorService.addVendor(this.vendor).subscribe(
        (data) => {
          this.toaster.open('New vendor has been added', 'success');
        },
        (error) => {
          this.toaster.open('Update issue was occurred');
        }
      );
    }
  }

  onAddPhone(phoneNumber: string): void {
    this.vendor.phones.push({
      number: phoneNumber
    });
  }

  onDeletePhone(idx: number): void {
    this.vendor.phones.splice(idx, 1);
  }

  onAddAddress(street: string): void {
    this.vendor.addresses.push({
      street
    });
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
        },
        (error) => {
          this.toaster.open('Сan not get vendorId');
        }
      );
    }
  }
}
