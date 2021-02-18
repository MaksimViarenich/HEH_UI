import { VendorService } from '../vendor.service';
import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ToasterService } from 'src/app/services/toaster-service/toaster.service';
import { ModalService } from '../../../../services/modal-service/modal.service';

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

  constructor(public vendorService: VendorService,
              private modalService: ModalService,
              private toaster: ToasterService) {
  }

  deleteVendor(): any {
    const dialogRef = this.modalService.openConfirmModal();
    dialogRef.afterClosed().subscribe((isDelete: any) => {
      if (isDelete) {
        this.vendorService.deleteVendor(this.data.id).subscribe(
          (data) => {
            this.updateCardsAfterDelete.emit();
            this.toaster.open('Information about vendor has been removed', 'success');
          },
          (error) => {
            this.toaster.open('Information about vendor hasn\'t been removed');
          }
        );
      }
    });
  }

  ngOnInit(): void {
  }
}
