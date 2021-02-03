import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Vendor} from '../../../../models/vendor';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {AddDiscountModalComponent} from '../add-discount-modal/add-discount-modal.component';
import {DiscountCard} from '../../../../models/discount-card';
import {Discount} from '../../../../models/discount';

@Component({
  selector: 'app-vendor-modal',
  templateUrl: './add-vendor-modal.component.html',
  styleUrls: ['./add-vendor-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddVendorModalComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public vendor: Vendor
  ) {
  }

  vendorName = new FormControl();

  addressTitle = 'vendors.add-vendor.address';
  phoneTitle = 'vendors.add-vendor.phone';

  openDiscountModal(discount?: Discount): void {
    const dialogRef = this.dialog.open(AddDiscountModalComponent, {
      panelClass: 'add-discount-modal',
      data: {
        discount: discount || {},
        addresses: this.vendor.addressList,
        phones: this.vendor.phones,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }
}
