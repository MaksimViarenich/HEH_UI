import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VendorCard } from '../../../models/vendor-card';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  list: Array<VendorCard> = [];

  ngOnInit(): void {
  }

}
