import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Vendor} from '../../../../models/vendor';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Discount} from '../../../../models/discount';
import {ModalService} from '../../../../services/modal-service/modal.service';
import { VendorDetail } from 'src/app/models/vendor-detail';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-modal',
  templateUrl: './add-vendor-modal.component.html',
  styleUrls: ['./add-vendor-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddVendorModalComponent implements OnInit {
  vendorDetail: any;

  setListData() {
    if (address) {
      ListData = this.vendorDetail.street;
    } else {
      ListData = ....
    }
  }

  constructor(
    public vendorService: VendorService,
    public dialog: MatDialog,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public vendorForId: Vendor
    // VendorDetail
  ) {
    this.vendorDetail = {};
  }

  vendorName = new FormControl();

  addressTitle = 'vendors.add-vendor.address';
  phoneTitle = 'vendors.add-vendor.phone';

  openDiscountModal(discount?: Discount): void {
    this.modalService.openAddDiscountModal(discount, this.vendorDetail);
  }

  ngOnInit(): void {
    if (this.vendorForId.id) {
      this.vendorService.getVendorDetail(this.vendorForId.id).subscribe(
        (data) => {
          this.vendorDetail = data;
        }
      );
    }
  }
}
