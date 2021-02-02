import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-model-list-input',
  templateUrl: './model-list-input.component.html',
  styleUrls: ['./model-list-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ModelListInputComponent {
  @Input() label = '';
  listData: string[] = [];
  inputValue = '';

  addData(data: string): void {
    this.listData.push(data);
    this.inputValue = '';
  }

  deleteData(idx: number): void {
    this.listData.splice(idx, 1);
  }
}
