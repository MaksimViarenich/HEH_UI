import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../../../services/modal-service/modal.service';
import { FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-model-list-input',
  templateUrl: './model-list-input.component.html',
  styleUrls: ['./model-list-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ModelListInputComponent {
  @Input() label: string;
  @Input() listData: any[];
  @Input() type: string;
  @Output() deleteData = new EventEmitter<number>();
  inputValue = '';
  phonesVendor: FormControl;

  constructor(public dialog: MatDialog, private modalService: ModalService) {
    this.label = '';
    this.listData = [];
    this.type = '';
    this.phonesVendor = new FormControl(null, [Validators.pattern('^[+]?\\d*[(]?\\d*[)]?[0-9]*$')]);
  }

  validatePhone(event: any): any{
    let k;
    k = event.charCode;
    return(_.isEqual(k, 43) || _.isEqual(k, 40) || _.isEqual(k, 41) || (k >= 48 && k <= 57));
  }


  addPhone(): void {
    this.listData.push({
      id: _.size(this.listData) + 1,
      number: this.inputValue
    });
    this.inputValue = '';
  }

  openAddAddressModal(): void {
    const dialogRef = this.modalService.openAddAddressModal();

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        if (data.street) {
          this.listData.push(data);
        }
      }
    });
  }
}
