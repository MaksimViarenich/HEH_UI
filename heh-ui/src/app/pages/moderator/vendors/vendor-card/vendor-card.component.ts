import { VendorService } from './../vendor.service';
import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-vendor-card',
  templateUrl: './vendor-card.component.html',
  styleUrls: ['./vendor-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VendorCardComponent implements OnInit {
  @Input() data: any | undefined;
  @Input() isViewCountsVisible: boolean | undefined;
  @Output() updateCardsAfterDelete: EventEmitter<any> = new EventEmitter();

  constructor(public vendorService: VendorService) {
  }

  deleteVendor(): any {
    this.vendorService.deleteVendor(this.data.id).subscribe(() => {
        this.updateCardsAfterDelete.emit();
      }
    );
  }

  ngOnInit(): void {
  }
}
