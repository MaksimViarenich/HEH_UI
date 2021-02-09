import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Phones } from 'src/app/models/phones';
import { Address } from '../../../../../models/address';

@Component({
  selector: 'app-model-list-input',
  templateUrl: './model-list-input.component.html',
  styleUrls: ['./model-list-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ModelListInputComponent {
  @Input() label: string;
  @Input() listData: string[];
  inputValue = '';

  constructor() {
    this.label = '';
    this.listData = [];
  }


  addData(data: string): void {
    this.listData.push(data);
    this.inputValue = '';
  }

  deleteData(idx: number): void {
    this.listData.splice(idx, 1);
  }
}
