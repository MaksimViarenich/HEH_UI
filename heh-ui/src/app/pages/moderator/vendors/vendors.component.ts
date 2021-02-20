import { VendorService } from './vendor.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal-service/modal.service';
import { Vendor } from 'src/app/models/vendor';
import { ToasterService } from '../../../services/toaster-service/toaster.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})

export class VendorsComponent implements OnInit {
  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private vendorService: VendorService,
              private toaster: ToasterService) {
  }

  vendors: any = [];
  vendorsDetail: any = [];
  breakpoint = 0;

  openVendorModal(data?: Vendor): void {
    const dialogRef = this.modalService.openVendorModal(data);

    dialogRef.afterClosed().subscribe((dataVendor: any) => {
      if (dataVendor) {
        this.getAllVendors();
      }
    });
  }

  getAllVendors(): void {
    this.vendorService.getVendors().subscribe(
      (data) => {
        this.vendors = data;
      },
      () => {
        this.toaster.open('Information about vendors hasn\'t been received');
      }
    );
  }

  onResize(event: any): void {
    switch (true) {
      case event.target.innerWidth > 1200:
        this.breakpoint = 4;
        break;
      case (event.target.innerWidth <= 1200 && event.target.innerWidth > 800):
        this.breakpoint = 3;
        break;
      case (event.target.innerWidth <= 800 && event.target.innerWidth > 540):
        this.breakpoint = 2;
        break;
      case event.target.innerWidth <= 540:
        this.breakpoint = 1;
        break;
    }
  }

  ngOnInit(): void {
    this.getAllVendors();
    switch (true) {
      case window.innerWidth > 1200:
        this.breakpoint = 4;
        break;
      case (window.innerWidth <= 1200 && window.innerWidth > 800):
        this.breakpoint = 3;
        break;
      case (window.innerWidth <= 800 && window.innerWidth > 540):
        this.breakpoint = 2;
        break;
      case window.innerWidth <= 540:
        this.breakpoint = 1;
        break;
    }
  }
}
