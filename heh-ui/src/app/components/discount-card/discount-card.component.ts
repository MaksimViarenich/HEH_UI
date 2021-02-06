import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-discount-card',
  templateUrl: './discount-card.component.html',
  styleUrls: ['./discount-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DiscountCardComponent implements OnInit {
  @Input() discountInfo: any | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
