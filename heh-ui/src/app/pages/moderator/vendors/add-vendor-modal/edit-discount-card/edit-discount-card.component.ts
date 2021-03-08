import { TranslateService } from '@ngx-translate/core';
import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from 'src/app/services/modal-service/modal.service';

@Component({
  selector: 'app-edit-discount-card',
  templateUrl: './edit-discount-card.component.html',
  styleUrls: ['./edit-discount-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditDiscountCardComponent {
  @Input() discountInfo: any;
  @Output() removeDiscountFromVendor: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private translateService: TranslateService) {}

  deleteDiscount(): void{
    const confirmData = {
      message: this.translateService.instant('confirmation.delete.message'),
      buttonPositive: this.translateService.instant('confirmation.delete.button-positive'),
      buttonNegative: this.translateService.instant('confirmation.delete.button-negative'),
    };
    const dialogRef = this.modalService.openConfirmModal(confirmData);

    dialogRef.afterClosed().subscribe((isDelete: any) => {
      if (isDelete) {
        this.removeDiscountFromVendor.emit();
      }
    });
  }
}
