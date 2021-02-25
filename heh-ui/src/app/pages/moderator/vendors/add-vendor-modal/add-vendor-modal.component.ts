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
  vendorCopy: any;

  constructor(
    private filterService: FiltersService,
    public vendorService: VendorService,
    public dialog: MatDialog,
    private modalService: ModalService,
    private toaster: ToasterService,
    private matDialogRef: MatDialogRef<any>,
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
    this.vendorName = new FormControl('', [Validators.required]);
    this.vendorCopy = {};
  }

  addressTitle = 'vendors.add-vendor.address';
  phoneTitle = 'vendors.add-vendor.phone';

  openDiscountModal(discount?: Discount, index?: any): void {
    const dialogRef = this.modalService.openAddDiscountModal(discount, index, this.vendorCopy);

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        if (index !== undefined) {
          this.vendorCopy.discounts[index] = data;
        } else {
          this.vendorCopy.discounts.push(data);
        }
      }
    });
  }

  addUpdateNewVendor(): void {
    this.vendorCopy.links = [];
    this.vendorCopy.links.push(
      {type: 'Website', url: this.links.website},
      {type: 'Instagram', url: this.links.instagram},
      {type: 'Facebook', url: this.links.facebook},
      {type: 'Vkontakte', url: this.links.vkontakte},
    );

    this.vendorCopy.addresses = this.vendorCopy.addresses.map((address: any) => {
      return {
        id: address.id,
        countryId: address.country.id,
        cityId: address.city.id,
        street: address.street,
      };
    });

    if (this.vendorCopy.id) {
      this.vendorService.updateVendor(this.vendorCopy).subscribe(
        () => {
          this.toaster.open('Vendor was updated', 'success');
          this.matDialogRef.close(this.vendorCopy);
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
          this.onAddAddress(this.vendorCopy.addresses);
        }
      );
    } else {
      this.vendorService.addVendor(this.vendorCopy).subscribe(
        () => {
          this.toaster.open('New vendor has been added', 'success');
          this.matDialogRef.close(this.vendorCopy);
        },
        () => {
          this.toaster.open('There is no possibility to add a new vendor');
          this.onAddAddress(this.vendorCopy.addresses);
        }
      );
    }
  }

  deleteDiscount(index: any): void {
    if (this.vendorCopy.discounts[index] !== undefined) {
      this.vendorCopy.discounts.splice(index, 1);
    }

    return this.vendorCopy.discounts;
  }

  onDeletePhone(idx: number): void {
    this.vendorCopy.phones.splice(idx, 1);
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
    this.vendorCopy.addresses = editAddresses;
  }

  onDeleteAddress(idx: number): void {
    this.vendorCopy.addresses.splice(idx, 1);
  }

  restoreVendorData(): void{
    this.vendorCopy = cloneDeep(this.vendor);
    this.onAddAddress(this.vendorCopy.addresses);
  }

  ngOnInit(): void {
    if (this.vendorForId.id) {
      this.vendorService.getVendorDetail(this.vendorForId.id).subscribe(
        (data) => {
          this.vendor = data;
          this.vendorCopy = cloneDeep(this.vendor);
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
