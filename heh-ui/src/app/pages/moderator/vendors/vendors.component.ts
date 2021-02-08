import { Vendor } from './../../../models/vendor';
import { VendorService } from './vendor.service';
import {  Component, OnInit } from '@angular/core';
import {  MatDialog } from '@angular/material/dialog';
import {  VendorCard  } from '../../../models/vendor-card';
import {  ModalService  } from '../../../services/modal-service/modal.service';

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

  vendorList: Array<Vendor> = [];

  openVendorModal(data?: VendorCard): void {
    this.modalService.openVendorModal(data);
  }

  ngOnInit(): void {
    this.vendorService.getVendors().subscribe(
      (data) => {
        this.vendorList = data;
        console.log(this.vendorList);
      }
    );
  }
}
