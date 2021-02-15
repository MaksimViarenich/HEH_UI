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

  openVendorModal(data?: Vendor): void {
    const dialogRef = this.modalService.openVendorModal(data);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      this.getAllVendors();
    });
  }

  getAllVendors(): void {
    this.vendorService.getVendors().subscribe(
      (data) => {
        this.vendors = data;
      },
      (error) => {
        this.toaster.open('Information about vendors hasn\'t been received');
      }
    );
  }

  ngOnInit(): void {
    this.getAllVendors();
  }
}
