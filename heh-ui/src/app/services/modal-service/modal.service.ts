import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Discount } from '../../models/discount';
import { AddVendorModalComponent } from '../../pages/moderator/vendors/add-vendor-modal/add-vendor-modal.component';
import { AddDiscountModalComponent } from '../../pages/moderator/vendors/add-discount-modal/add-discount-modal.component';
import { Vendor } from '../../models/vendor';
import { DiscountDetailsModalComponent } from '../../pages/discounts/discount-details-modal/discount-details-modal.component';
import { AddAddressComponent } from '../../pages/moderator/vendors/add-vendor-modal/model-list-input/add-address/add-address.component';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  constructor(public dialog: MatDialog) {}

  openVendorModal(data?: Vendor): any {
    return this.dialog.open(AddVendorModalComponent, {
      data: data ? data : {},
      panelClass: 'vendor-details-modal',
      backdropClass: 'vendor-details-modal-backdrop',
      maxWidth: '66rem',
      autoFocus: false,
      disableClose: true,
    });
  }

  openAddDiscountModal(discount?: Discount, index?: any, vendor?: Vendor): any {
    return this.dialog.open(AddDiscountModalComponent, {
      data: {
        discount: discount || {},
        addresses: vendor ? vendor.addresses : [],
        phones: vendor ? vendor.phones : [],
        indexForLabel: index + 1 || '',
      },
      panelClass: 'add-discount-modal',
      backdropClass: 'add-discount-modal-backdrop',
      maxWidth: '33rem',
      autoFocus: false,
      disableClose: true,
    });
  }

  openDiscountDetailsModal(id: string, isVisibleEditNote?: boolean, favoriteNote?: string,
                           countsVisible?: boolean, viewAmount?: number): any {
    return this.dialog.open(DiscountDetailsModalComponent, {
      data: {
        id,
        countsVisible,
        viewAmount,
        isVisibleEditNote,
        favoriteNote
      },
      maxWidth: '33rem',
      panelClass: 'discount-details-modal',
      backdropClass: 'discount-details-modal-backdrop',
      autoFocus: false,
      disableClose: true,
    });
  }

  openAddAddressModal(): any {
    return this.dialog.open(AddAddressComponent, {
      width: '25rem',
      panelClass: 'add-address-modal',
      backdropClass: 'add-address-modal-backdrop',
      autoFocus: false,
      disableClose: true,
    });
  }

  openConfirmModal(data?: any): any {
    return this.dialog.open(ConfirmationDialogComponent, {
      data,
      width: '20rem',
      height: '13rem',
      panelClass: 'confirm-modal',
      backdropClass: 'confirm-modal-backdrop',
    });
  }
}
