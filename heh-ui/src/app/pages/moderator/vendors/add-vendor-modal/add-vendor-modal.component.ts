import { TranslateService } from '@ngx-translate/core';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { cloneDeep, isEqual, map, forEach, size, toLower } from 'lodash';
import { VendorCard } from '../../../../models/vendor-card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Discount } from '../../../../models/discount';
import { ModalService } from '../../../../services/modal-service/modal.service';
import { VendorService } from '../vendor.service';
import { FiltersService } from 'src/app/services/filter-service/filters.service';
import { ToasterService } from '../../../../services/toaster-service/toaster.service';
import { FormControl, Validators } from '@angular/forms';

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
  pristineVendor: any;
  pristineLinks: any;
  vendorName = new FormControl();

  constructor(private filterService: FiltersService,
              public vendorService: VendorService,
              public dialog: MatDialog,
              private modalService: ModalService,
              private toaster: ToasterService,
              private matDialogRef: MatDialogRef<any>,
              private translateService: TranslateService,
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
    this.pristineVendor = cloneDeep(this.vendor);
    this.pristineLinks = cloneDeep(this.links);
    this.vendorName = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  }

  addressTitle = 'vendors.add-vendor.address';
  phoneTitle = 'vendors.add-vendor.phone';

  isSaveDisabled(): boolean {
    return !(this.vendor.name && this.vendor.addresses.length);
  }

  openDiscountModal(discount?: Discount, index?: any): void {
    const dialogRef = this.modalService.openAddDiscountModal(discount, index, this.vendor);

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data.promoCode) {
        if (!isEqual(index, undefined)) {
          this.vendor.discounts[index] = data;
        } else {
          this.vendor.discounts.push(data);
        }
      }
    });
  }

  checkChanges(): any {
    if (isEqual(this.vendor.id, undefined)) {
      this.pristineVendor.name = undefined;
    }

    const isChanged = isEqual(this.pristineVendor, this.vendor) && isEqual(this.pristineLinks, this.links);
    const confirmData = {
      message: this.translateService.instant('confirmation.change.message'),
      buttonPositive: this.translateService.instant('confirmation.change.button-positive'),
      buttonNegative: this.translateService.instant('confirmation.change.button-negative'),
    };

    if (!isChanged) {
      const dialogRef = this.modalService.openConfirmModal(confirmData);

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.matDialogRef.close('');
        }
      });
    } else {
      this.matDialogRef.close('');
    }
  }

  changeDates(date: any): any {
    const objDateString = date.toString();
    const month = (date.getMonth() + 1).toString().length === 1 ?
                      `0${(date.getMonth() + 1).toString()}` :
                      (date.getMonth() + 1).toString();

    return `${objDateString.slice(11, 15)}-` + month + `-${objDateString.slice(8, 10)}T00:00:00Z`;
  }

  addUpdateNewVendor(): void {
    const vendorCopy = cloneDeep(this.vendor);

    forEach(vendorCopy.discounts, item => {
      if (item.startDate && typeof(item.startDate) !== 'string') {
        item.startDate = this.changeDates(item.startDate);
      }
      if (item.endDate && typeof(item.endDate) !== 'string') {
        item.endDate = this.changeDates(item.endDate);
      }
    });

    vendorCopy.links = [];
    vendorCopy.links.push(
      {type: 'Website', url: this.links.website},
      {type: 'Instagram', url: this.links.instagram},
      {type: 'Facebook', url: this.links.facebook},
      {type: 'Vkontakte', url: this.links.vkontakte},
    );

    vendorCopy.addresses = map(vendorCopy.addresses, (address: any) => {
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
    if (!isEqual(this.vendor.discounts[index], undefined)) {
      this.vendor.discounts.splice(index, 1);
    }

    return this.vendor.discounts;
  }

  onDeletePhone(idx: number): void {
    this.vendor.phones.splice(idx, 1);
  }

  onAddAddress(address: any): void {
    const editAddresses: any[] = [];
    map(address, (addr: any) => {
      forEach(this.countriesCities, (item: any) => {
          if (isEqual(addr.countryId, item.id)) {
            if (isEqual(addr.cityId, null)) {
                editAddresses.push({
                  country: {
                    country: item.country,
                    id: item.id,
                    cities: item.cities,
                  },
                  city: '',
                  street: '',
                  id: addr.id,
                });
            } else {
              for (const city of item.cities) {
                if (isEqual(addr.cityId, city.id)) {
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
    this.links = cloneDeep(this.pristineLinks);
    this.vendor.addresses = cloneDeep(this.pristineVendor.addresses);
  }

  canNotBeSaved(): boolean {
    return isEqual(this.vendor, this.pristineVendor) && isEqual(this.links, this.pristineLinks);
  }

  ngOnInit(): void {
    this.matDialogRef.backdropClick().subscribe(() => {
      this.checkChanges();
    });

    if (this.vendorId.id) {
      this.vendorService.getVendorDetail(this.vendorId.id).subscribe(
        (data) => {
          this.vendor = data;
          this.onAddAddress(data.addresses);
          this.pristineVendor = cloneDeep(this.vendor);

          if (size(data.links)) {
            this.links = Object.assign({}, ...data.links.map((link: any) => {
              return {
                [toLower(link.type)]: link.url
              };
            }));
            this.pristineLinks = cloneDeep(this.links);
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
