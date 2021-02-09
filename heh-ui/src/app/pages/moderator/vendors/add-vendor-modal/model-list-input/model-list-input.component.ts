import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() addData = new EventEmitter<string>();
  @Output() deleteData = new EventEmitter<number>();
  inputValue = '';

  constructor() {
    this.label = '';
    this.listData = [];
  }

  onAddData(): void {
    this.addData.emit(this.inputValue);
    this.inputValue = '';
  }
}
