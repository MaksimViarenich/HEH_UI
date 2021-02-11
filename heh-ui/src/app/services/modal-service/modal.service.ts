import {Injectable} from '@angular/core';
import {AddVendorModalComponent} from '../../pages/moderator/vendors/add-vendor-modal/add-vendor-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {Discount} from '../../models/discount';
import {AddDiscountModalComponent} from '../../pages/moderator/vendors/add-discount-modal/add-discount-modal.component';
import {Vendor} from '../../models/vendor';
import {DiscountDetailsModalComponent} from '../../pages/discounts/discount-details-modal/discount-details-modal.component';
import {EditNoteModalComponent} from '../../pages/favorites/edit-note-modal/edit-note-modal.component';
import {AddAddressComponent} from '../../pages/moderator/vendors/add-vendor-modal/model-list-input/add-address/add-address.component';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  constructor(public dialog: MatDialog) {
  }

  openVendorModal(data?: Vendor): void {
    const dialogRef = this.dialog.open(AddVendorModalComponent, {
      data: data ? data : {},
      panelClass: 'vendor-details-modal',
      backdropClass: 'vendor-details-modal-backdrop',
      maxWidth: '66rem',
    });

    dialogRef.afterClosed().subscribe(() => { });
  }

  openAddDiscountModal(discount?: Discount, vendor?: Vendor): void {
    const dialogRef = this.dialog.open(AddDiscountModalComponent, {
      data: {
        discount: discount || {},
        addresses: vendor ? vendor.addresses : [],
        phones: vendor ? vendor.phones : [],
      },
      panelClass: 'add-discount-modal',
      backdropClass: 'add-discount-modal-backdrop',
      maxWidth: '33rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

    openDiscountDetailsModal(discount: Discount): void {
    const dialogRef = this.dialog.open(DiscountDetailsModalComponent, {
      data: discount,
      maxWidth: '33rem',
      panelClass: 'discount-details-modal',
      backdropClass: 'discount-details-modal-backdrop',
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openEditNoteModal(data: any): void {
    const dialogRef = this.dialog.open(EditNoteModalComponent, {
      data,
      maxWidth: '25rem',
      panelClass: 'edit-note-modal',
      backdropClass: 'edit-note-modal-backdrop',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddAddressModal(): any {
    return this.dialog.open(AddAddressComponent, {
      width: '33rem',
    });
  }
}
