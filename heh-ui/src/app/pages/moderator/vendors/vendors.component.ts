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
  breakpoint: number;

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private vendorService: VendorService,
              private toaster: ToasterService,
              private gridService: GridService) {
    this.breakpoint = 0;
  }

  vendors: any = [];
  vendorsDetail: any = [];


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
    this.breakpoint = this.gridService.getDiscountGrid(event.target.innerWidth);
  }

  ngOnInit(): void {
    this.getAllVendors();
    this.breakpoint = this.gridService.getDiscountGrid(window.innerWidth);
  }
}
