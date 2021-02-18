import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { StatisticsService } from './statistics.service';
import { DiscountCard } from '../../../models/discount-card';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  constructor(public dialog: MatDialog,
              private statisticsService: StatisticsService,
              private toaster: ToasterService) {}

  list: Array<DiscountCard> = [];

  ngOnInit(): void {
    this.statisticsService.getVendorsStatistics().subscribe(
      (data) => {
        this.list = data.value;
      },
      (error) => {
        this.toaster.open('There is no possibility to show statistics');
      }
    );
  }
}
