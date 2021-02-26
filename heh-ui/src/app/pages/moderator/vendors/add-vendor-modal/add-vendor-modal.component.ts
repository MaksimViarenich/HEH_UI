import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { VendorCard } from '../../../../models/vendor-card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Discount } from '../../../../models/discount';
import { ModalService } from '../../../../services/modal-service/modal.service';
import { VendorService } from '../vendor.service';
import { FiltersService } from 'src/app/services/filter-service/filters.service';
import { ToasterService } from '../../../../services/toaster-service/toaster.service';
import { cloneDeep } from 'lodash';

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
  vendorName: FormControl;
  pristineVendor: any;

  constructor(
    private filterService: FiltersService,
    public vendorService: VendorService,
    public dialog: MatDialog,
    private modalService: ModalService,
    private toaster: ToasterService,
    private matDialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public vendorId: VendorCard
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
    this.vendorName = new FormControl('', [Validators.required]);
    this.pristineVendor = {};
  }

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
    const vendorCopy = cloneDeep(this.vendor);

    vendorCopy.links = [];
    vendorCopy.links.push(
      {type: 'Website', url: this.links.website},
      {type: 'Instagram', url: this.links.instagram},
      {type: 'Facebook', url: this.links.facebook},
      {type: 'Vkontakte', url: this.links.vkontakte},
    );

    vendorCopy.addresses = vendorCopy.addresses.map((address: any) => {
      return {
        id: address.id,
        countryId: address.country.id,
        cityId: address.city.id,
        street: address.street,
      };
    });

    if (vendorCopy.id) {
      this.vendorService.updateVendor(vendorCopy).subscribe(
        () => {
          this.toaster.open('Vendor was updated', 'success');
          this.matDialogRef.close(vendorCopy);
        },
        (error) => {
          let errorMessage = '';
          switch (true) {
            case error.error.errors.hasOwnProperty('Addresses'):
              errorMessage += `${error.error.errors.Addresses[0]} `;
              break;
            case error.error.errors.hasOwnProperty('Discounts'):
              errorMessage += `${error.error.errors.Discounts[0]} `;
              break;
            case error.error.errors.hasOwnProperty('WorkingHours'):
              errorMessage += `${error.error.errors.WorkingHours} `;
              break;
            default:
              errorMessage = 'Couldn\`t update vendor';
          }

          this.toaster.open(errorMessage);
        }
      );
    } else {
      this.vendorService.addVendor(vendorCopy).subscribe(
        () => {
          this.toaster.open('New vendor has been added', 'success');
          this.matDialogRef.close(vendorCopy);
        },
        () => {
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
                  id: addr.id,
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

  restoreVendorData(): void{
    this.vendor = cloneDeep(this.pristineVendor);
    this.onAddAddress(this.vendor.addresses);
  }

  ngOnInit(): void {
    if (this.vendorId.id) {
      this.vendorService.getVendorDetail(this.vendorId.id).subscribe(
        (data) => {
          this.vendor = data;
          this.pristineVendor = cloneDeep(this.vendor);
          this.onAddAddress(data.addresses);
          if (data.links.length) {
            this.links = Object.assign({}, ...data.links.map((link: any) => {
              return {
                [link.type.toLowerCase()]: link.url
              };
            }));
          }
        },
        () => {
          this.toaster.open('Сan not get vendorId');
        }
      );
      this.countriesCities = this.filterService.countriesCities;
    }
  }
}
