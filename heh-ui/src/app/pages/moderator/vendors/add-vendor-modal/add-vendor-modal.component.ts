import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Vendor} from '../../../../models/vendor';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Discount} from '../../../../models/discount';
import {ModalService} from '../../../../services/modal-service/modal.service';

@Component({
  selector: 'app-vendor-modal',
  templateUrl: './add-vendor-modal.component.html',
  styleUrls: ['./add-vendor-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddVendorModalComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public vendor: Vendor
  ) {
  }

  vendorName = new FormControl();

  addressTitle = 'vendors.add-vendor.address';
  phoneTitle = 'vendors.add-vendor.phone';

  openDiscountModal(discount?: Discount): void {
    this.modalService.openAddDiscountModal(discount, this.vendor);
  }

  ngOnInit(): void {
  }
}
