import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-discount-card',
  templateUrl: './discount-card.component.html',
  styleUrls: ['./discount-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DiscountCardComponent implements OnInit {
  @Input() discountInfo: any | undefined;
  @Input() isRemoveAvailable: boolean | undefined;
  @Input() isViewCountsVisible: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
