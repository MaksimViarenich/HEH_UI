import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VendorCard } from '../../../../models/vendor-card';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Discount } from '../../../../models/discount';
import { ModalService } from '../../../../services/modal-service/modal.service';
import { VendorService } from '../vendor.service';
import { FiltersService } from 'src/app/pages/discounts/filters.service';

@Component({
  selector: 'app-vendor-modal',
  templateUrl: './add-vendor-modal.component.html',
  styleUrls: ['./add-vendor-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddVendorModalComponent implements OnInit {
  vendorForView: any;
  vendor: any;
  links: any;
  countriesCities: any;

  constructor(
    private filterService: FiltersService,
    public vendorService: VendorService,
    public dialog: MatDialog,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public vendorForId: VendorCard
  ) {
    this.vendor = {
      addresses: [],
      phones: []
    };
    this.links = {
      website: '',
      instagram: '',
      facebook: '',
      vkontakte: '',
    };
    // console.log(this.vendor);
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
      console.log(address);
      console.log(this.countriesCities);
      const editAddress: any = {};
      const country: any = {};
      const city: any = {};
      this.countriesCities.forEach((item: any) => {
        for (const adr of address) {
          if (adr.countryId === item.id) {
            country.country = item.country;
            country.id = item.id;
            editAddress.street = adr.street;
          }
        }
      });
      this.countriesCities.forEach((item: any) => {
        for (const cit of address) {
          if (cit.countryId === item.id) {
            item.cities.forEach((cityNames: any) => {
              if (cit.cityId === cityNames.id) {
                city.name = cityNames.name;
                city.id = cityNames.id;
              }
            });
          }
        }
      });
      editAddress.city = city;
      editAddress.country = country;
      console.log(editAddress);
      this.vendor.addresses.push(editAddress);
  }

  onDeleteAddress(idx: number): void {
    this.vendor.addresses.splice(idx, 1);
  }

  ngOnInit(): void {
    if (this.vendorForId.id) {
      this.vendorService.getVendorDetail(this.vendorForId.id).subscribe(
        (data) => {
          this.vendor = data;
          this.onAddAddress(data.addresses);
          if (data.links.length) {
            this.links = Object.assign({}, ...data.links.map((link: any) => {
              return {
                [link.type.toLowerCase()]: link.url
              };
            }));
          }
        }
      );
      this.countriesCities = this.filterService.countriesCities;
    }
  }
}
