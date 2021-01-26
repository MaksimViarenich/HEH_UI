import { Component, OnInit, Input } from '@angular/core';
import { DiscountCard } from '../../models/discount-card';

@Component({
  selector: 'app-discount-card',
  templateUrl: './discount-card.component.html',
  styleUrls: ['./discount-card.component.scss']
})
export class DiscountCardComponent implements OnInit {

  @Input() discountInfo: DiscountCard | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
