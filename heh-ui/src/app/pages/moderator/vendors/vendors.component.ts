import { VendorService } from './vendor.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal-service/modal.service';
import { Vendor } from 'src/app/models/vendor';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { GridService } from '../../../services/grid-service/grid.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})

export class VendorsComponent implements OnInit {
  vendors: any = [];
  topVendors: number;
  skipVendors: number;
  previousScrollPosition: number;
  totalCount: number;
  breakpoint: number;

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private vendorService: VendorService,
              private toaster: ToasterService,
              private gridService: GridService) {
    this.topVendors = 7;
    this.skipVendors = 0;
    this.previousScrollPosition = 0;
    this.totalCount = 0;
    this.breakpoint = 0;
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

  onResize(event: any): void {
    this.breakpoint = this.gridService.getDiscountGrid(event.target.innerWidth);
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !(this.vendors.length === this.totalCount)) {
      this.skipVendors += this.topVendors;
      this.getAllVendors(this.topVendors, this.skipVendors);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }

  ngOnInit(): void {
    this.getAllVendors(this.topVendors, this.skipVendors);
    this.breakpoint = this.gridService.getDiscountGrid(window.innerWidth);
  }
}
