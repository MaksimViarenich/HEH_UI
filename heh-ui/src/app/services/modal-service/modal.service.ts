import {Injectable} from '@angular/core';
import {VendorCard} from '../../models/vendor-card';
import {AddVendorModalComponent} from '../../pages/moderator/vendors/add-vendor-modal/add-vendor-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {Discount} from '../../models/discount';
import {AddDiscountModalComponent} from '../../pages/moderator/vendors/add-discount-modal/add-discount-modal.component';
import {Vendor} from '../../models/vendor';
import {DiscountCard} from '../../models/discount-card';
import {DiscountDetailsModalComponent} from '../../pages/discounts/discount-details-modal/discount-details-modal.component';
import {EditNoteModalComponent} from '../../pages/favorites/edit-note-modal/edit-note-modal.component';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  constructor(public dialog: MatDialog) {
  }

  openVendorModal(data?: VendorCard): void {
    const dialogRef = this.dialog.open(AddVendorModalComponent, {
      data: data ? data.vendor : {},
      panelClass: 'vendor-details-modal',
      backdropClass: 'vendor-details-modal-backdrop',
      maxWidth: '66rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddDiscountModal(discount?: Discount, vendor?: Vendor): void {
    const dialogRef = this.dialog.open(AddDiscountModalComponent, {
      data: {
        discount: discount || {},
        addresses: vendor ? vendor.addressList : [],
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

  openDiscountDetailsModal(discount: DiscountCard): void {
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
      maxWidth: '20rem',
      backdropClass: 'edit-note-modal-backdrop',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
