import { SideNavComponent } from './../../components/header/side-nav/side-nav.component';
import { Injectable } from '@angular/core';
import { AddVendorModalComponent } from '../../pages/moderator/vendors/add-vendor-modal/add-vendor-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Discount } from '../../models/discount';
import { AddDiscountModalComponent } from '../../pages/moderator/vendors/add-discount-modal/add-discount-modal.component';
import { Vendor } from '../../models/vendor';
import { DiscountDetailsModalComponent } from '../../pages/discounts/discount-details-modal/discount-details-modal.component';
import { EditNoteModalComponent } from '../../pages/favorites/edit-note-modal/edit-note-modal.component';
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
    });
  }

  openDiscountDetailsModal(id: string, countsVisible?: boolean, viewAmount?: number): any {
    return this.dialog.open(DiscountDetailsModalComponent, {
      data: {
        id,
        countsVisible,
        viewAmount
      },
      maxWidth: '33rem',
      panelClass: 'discount-details-modal',
      backdropClass: 'discount-details-modal-backdrop',
      autoFocus: false,
    });
  }

  openEditNoteModal(data: any): void {
    const dialogRef = this.dialog.open(EditNoteModalComponent, {
      data,
      maxWidth: '25rem',
      panelClass: 'edit-note-modal',
      backdropClass: 'edit-note-modal-backdrop',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddAddressModal(): any {
    return this.dialog.open(AddAddressComponent, {
      width: '25rem',
      panelClass: 'add-address-modal',
      backdropClass: 'add-address-modal-backdrop',
      autoFocus: false,
    });
  }

  openConfirmModal(): any {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '20rem',
      height: '10rem',
      panelClass: 'confirm-modal',
      backdropClass: 'confirm-modal-backdrop',
    });
  }

  openSideNav(): any {
    return this.dialog.open(SideNavComponent, {
      width: '50vw',
      panelClass: 'side-nav',
      backdropClass: 'side-nav-backdrop',
    });
  }
}
