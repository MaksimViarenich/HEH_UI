import { VendorService } from './vendor.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal-service/modal.service';
import { Vendor } from 'src/app/models/vendor';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { filter } from 'lodash';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})

export class VendorsComponent implements OnInit {
  vendors: any = [];
  vendorsDetail: any = [];
  searchData: any = {};
  topVendors: number;
  skipVendors: number;
  previousScrollPosition: number;
  totalCount: number;
   breakpoint = 0;

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private vendorService: VendorService,
              private toaster: ToasterService) {
    this.topVendors = 7;
    this.skipVendors = 0;
    this.previousScrollPosition = 0;
    this.totalCount = 0;
  } 

  openVendorModal(data?: Vendor): void {
    const dialogRef = this.modalService.openVendorModal(data);

    dialogRef.afterClosed().subscribe((dataVendor: any) => {
      if (dataVendor) {
        this.getAllVendors(this.topVendors, this.skipVendors);
      }
    });
  }

  getAllVendors(top: any, skip: any, filters?: any): void {
    this.vendorService.getVendors(filters, top, skip).subscribe(
      (data) => {
        data.value.forEach((vendor: any) => {
          this.vendors.push(vendor);
        });
        this.totalCount = data['@odata.count'];
      },
      () => {
        this.toaster.open('Information about vendors hasn\'t been received');
      }
    );
  }

  getVendorSearch(filters: any): void {
    this.vendors = [];
    this.skipVendors = 0;
    this.previousScrollPosition = 0;
    filters.vendorCategories = filters.categories;
    filters.idForVendor = filters.vendors;
    this.getAllVendors(this.topVendors, this.skipVendors, filters);
  }

  getAllVendorsAfterDelete(): void {
    this.vendors = [];
    this.skipVendors = 0;
    this.previousScrollPosition = 0;
    this.getAllVendors(this.topVendors, this.skipVendors);
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !(this.vendors.length === this.totalCount)) {
      this.skipVendors += this.topVendors;
      this.getAllVendors(this.topVendors, this.skipVendors);
      this.previousScrollPosition = event.currentScrollPosition;

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
    this.getAllVendors(this.topVendors, this.skipVendors);
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
