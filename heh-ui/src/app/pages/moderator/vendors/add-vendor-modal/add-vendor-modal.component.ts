import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Vendor} from '../../../../models/vendor';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Discount} from '../../../../models/discount';
import {ModalService} from '../../../../services/modal-service/modal.service';
import { VendorDetail } from 'src/app/models/vendor-detail';
import { VendorService } from '../vendor.service';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'app-vendor-modal',
  templateUrl: './add-vendor-modal.component.html',
  styleUrls: ['./add-vendor-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddVendorModalComponent implements OnInit {
  vendorDetail: any;
  vendorLinks: Array<Link>;
  vk: string;
  inst: string;
  facebook: string;
  website: string;

  constructor(
    public vendorService: VendorService,
    public dialog: MatDialog,
    private modalService: ModalService,
    @Inject(MAT_DIALOG_DATA) public vendorForId: Vendor
    // VendorDetail
  ) {
    this.vendorDetail = {};
    this.vendorLinks = this.vendorDetail.links;
    this.vk = '';
    this.inst = '';
    this. facebook = '';
    this.website = '';
  }

  vendorName = new FormControl();

  addressTitle = 'vendors.add-vendor.address';
  phoneTitle = 'vendors.add-vendor.phone';

  openDiscountModal(discount?: Discount): void {
    this.modalService.openAddDiscountModal(discount, this.vendorDetail);
  }

  getSocial(): any {
    console.log(this.vendorLinks);
    this.vendorLinks.forEach(item => {
      switch (item.type) {
        case 'Vkontakte':
          this.vk = item.url;
          break;
        case 'Instagram':
          this.inst = item.url;
          break;
        case 'Facebook':
          this.facebook = item.url;
          break;
        case 'Website':
          this.website = item.url;
          break;
      }
    });
  }

  ngOnInit(): void {
    if (this.vendorForId.id) {
      this.vendorService.getVendorDetail(this.vendorForId.id).subscribe(
        (data) => {
          this.vendorDetail = data;
          this.vendorLinks = this.vendorDetail.links;
          this.getSocial();
        }
      );
    }
  }
}
