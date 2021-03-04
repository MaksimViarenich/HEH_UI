import { TranslateService } from '@ngx-translate/core';
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
  @Output() updateCardsAfterDelete: EventEmitter<any> = new EventEmitter();

  constructor(public vendorService: VendorService,
              private modalService: ModalService,
              private toaster: ToasterService,
              private translateService: TranslateService) {
  }

  deleteVendor(): any {
    const confirmData = {
      message: this.translateService.instant('confirmation.delete.message'),
      buttonPositive: this.translateService.instant('confirmation.delete.button-positive'),
      buttonNegative: this.translateService.instant('confirmation.delete.button-negative'),
    };
    const dialogRef = this.modalService.openConfirmModal(confirmData);

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
