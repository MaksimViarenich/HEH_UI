import { Component, ViewEncapsulation, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressComponent } from './add-address/add-address.component';

@Component({
  selector: 'app-model-list-input',
  templateUrl: './model-list-input.component.html',
  styleUrls: ['./model-list-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ModelListInputComponent {
  @Input() label: string;
  @Input() listData: string[];
  @Input() type: string;
  @Output() addData = new EventEmitter<string>();
  @Output() deleteData = new EventEmitter<number>();
  inputValue = '';
  inputCountry = '';
  inputCity = '';
  inputStreet = '';
  address: any = {};

  constructor(public dialog: MatDialog) {
    this.label = '';
    this.listData = [];
    this.type = '';
  }

  onAddData(): void {
    this.addData.emit(this.address);
    this.inputValue = '';
  }

  openAddAddress(): void {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      width: '250px',
      data:  {
        country: this.inputCountry,
        city: this.inputCity,
        street: this.inputStreet,
      }
    });

    dialogRef.afterClosed().subscribe(adr => {
      this.address = adr;
      this.inputValue = `${this.address.country}, ${this.address.city},  ${this.address.street}`;
      console.log(this.address);
    });
  }
}
