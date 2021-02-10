import { VendorService } from './../vendor.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vendor-card',
  templateUrl: './vendor-card.component.html',
  styleUrls: ['./vendor-card.component.scss']
})
export class VendorCardComponent implements OnInit {
  @Input() data: any | undefined;
  @Input() isViewCountsVisible: boolean | undefined;
  @Output() deleteVendorCard: EventEmitter<string> = new EventEmitter();

  constructor(public vendorService: VendorService) {
  }

  deleteVendor(): any {
    this.deleteVendorCard.emit(this.data.id);

    this.vendorService.deleteVendor(this.data.id).subscribe();
  }

  ngOnInit(): void {
  }
}
