import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-vendor-card',
  templateUrl: './vendor-card.component.html',
  styleUrls: ['./vendor-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VendorCardComponent implements OnInit {
  @Input() data: any | undefined;
  @Input() isViewCountsVisible: boolean | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }
}
