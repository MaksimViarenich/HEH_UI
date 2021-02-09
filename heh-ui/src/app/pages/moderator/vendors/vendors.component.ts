import { Vendor } from './../../../models/vendor';
import { VendorService } from './vendor.service';
import {  Component, OnInit } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import {  VendorCard  } from '../../../models/vendor-card';
import {  ModalService  } from '../../../services/modal-service/modal.service';
import { VendorDetail } from 'src/app/models/vendor-detail';

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

  // vendorList: Array<Vendor> = [];
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

    // this.vendorService.getVendorsDetail().subscribe(
    //   (data) => {
    //     this.vendorsDetail = data;
    //   }
    // );
  }
}
