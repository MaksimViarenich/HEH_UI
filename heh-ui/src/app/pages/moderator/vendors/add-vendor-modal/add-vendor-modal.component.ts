import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { VendorCard } from '../../../../models/vendor-card';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Discount } from '../../../../models/discount';
import { ModalService } from '../../../../services/modal-service/modal.service';
import { VendorService } from '../vendor.service';
import { FiltersService } from 'src/app/pages/discounts/filters.service';
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
  countriesCities: any;

  constructor(
    private filterService: FiltersService,
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

  vendorName = new FormControl(null, [Validators.required]);

  addressTitle = 'vendors.add-vendor.address';
  phoneTitle = 'vendors.add-vendor.phone';

  openDiscountModal(discount?: Discount, index?: any): void {
    const dialogRef = this.modalService.openAddDiscountModal(discount, index, this.vendor);

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        if (index !== undefined) {
          this.vendor.discounts[index] = data;
        } else {
          this.vendor.discounts.push(data);
        }
      }
    });
  }

  addUpdateNewVendor(): void {
    this.vendor.links = [];
    this.vendor.links.push(
      {type: 'Website', url: this.links.website},
      {type: 'Instagram', url: this.links.instagram},
      {type: 'Facebook', url: this.links.facebook},
      {type: 'Vkontakte', url: this.links.vkontakte},
    );

    this.vendor.addresses = this.vendor.addresses.map((address: any, key: any) => {
      return {
        id: key + 1,
        countryId: address.country.id,
        cityId: address.city.id,
        street: address.street,
      };
    });

    if (this.vendor.id) {
      this.vendorService.updateVendor(this.vendor).subscribe(
        (data) => {
          this.toaster.open('Vendor was updated', 'success');
        },
        (error) => {
          this.toaster.open('Update issue was occurred');
        }
      );
    } else {
      this.vendorService.addVendor(this.vendor).subscribe(
        (data) => {
          this.toaster.open('New vendor has been added', 'success');
        },
        (error) => {
          this.toaster.open('There is no possibility to add a new vendor');
        }
      );
    }
  }

  deleteDiscount(index: any): void {
    if (this.vendor.discounts[index] !== undefined) {
      this.vendor.discounts.splice(index, 1);
    }

    return this.vendor.discounts;
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
    const editAddresses: any[] = [];
    address.map((addr: any) => {
      this.countriesCities.forEach((item: any) => {
          if (addr.countryId === item.id) {
            for (const city of item.cities) {
              if (addr.cityId === city.id) {
                editAddresses.push({
                  country: {
                    country: item.country,
                    id: item.id,
                    cities: item.cities,
                  },
                  city,
                  street: addr.street,
                });
              }
            }
          }
        }
      );
    });
    this.vendor.addresses = editAddresses;
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
        },
        (error) => {
          this.toaster.open('Сan not get vendorId');
        }
      );
      this.countriesCities = this.filterService.countriesCities;
    }
  }
}
