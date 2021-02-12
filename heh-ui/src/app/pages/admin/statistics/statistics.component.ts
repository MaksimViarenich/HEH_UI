import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VendorCard } from '../../../models/vendor-card';
import {VendorService} from '../../moderator/vendors/vendor.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  constructor(public dialog: MatDialog,
              private vendorService: VendorService) {}

  list: Array<VendorCard> = [];

  ngOnInit(): void {
    this.vendorService.getVendorsStatistics().subscribe(
      (data) => {
        this.list = data;
        console.log(this.list);
      }
    );
  }

}
