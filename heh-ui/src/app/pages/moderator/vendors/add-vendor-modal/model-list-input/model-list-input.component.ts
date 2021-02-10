import { Component, ViewEncapsulation, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressComponent } from './add-address/add-address.component';
import {ModalService} from '../../../../../services/modal-service/modal.service';

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
  @Output() addData = new EventEmitter<string>();
  @Output() deleteData = new EventEmitter<number>();
  inputValue = '';

  constructor(public dialog: MatDialog, private modalService: ModalService) {
    this.label = '';
    this.listData = [];
    this.type = '';
  }

  addPhone(): void {
    this.listData.push(this.inputValue);
    this.inputValue = '';
  }

  openAddAddressModal(): void {
    const dialogRef = this.modalService.openAddAddressModal();

    dialogRef.afterClosed().subscribe((data: any) => {
      this.listData.push(data);
    });
  }
}
