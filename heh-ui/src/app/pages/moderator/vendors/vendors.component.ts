import { VendorService } from './vendor.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal-service/modal.service';
import { Vendor } from 'src/app/models/vendor';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})

export class VendorsComponent implements OnInit {
  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private vendorService: VendorService) {
  }

  vendors: any = [];
  vendorsDetail: any = [];

  openVendorModall(data?: Vendor): void {
    this.modalService.openVendorModal(data);
  }

  ngOnInit(): void {
    this.vendorService.getVendors().subscribe(
      (data) => {
        this.vendors = data;
      }
    );
  }
}
