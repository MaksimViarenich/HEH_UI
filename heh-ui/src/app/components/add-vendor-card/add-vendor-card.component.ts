import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-vendor-card',
  templateUrl: './add-vendor-card.component.html',
  styleUrls: ['./add-vendor-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VendorCardComponent implements OnInit {
  @Input() addVendor: any | undefined;
  @Input() isRemoveAvailable: boolean | undefined;
  @Input() isViewCountsVisible: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
