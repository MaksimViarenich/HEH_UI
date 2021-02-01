import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-model-list-input',
  templateUrl: './model-list-input.component.html',
  styleUrls: ['./model-list-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ModelListInputComponent {
  @Input() title = '';
  @Output() DatePicked = new EventEmitter<any>();
  listData: string[] = [];

  pickDate(date: any): void {
    this.DatePicked.emit(date);
  }

  onKeypressEvent(event: any): void {
    if (event.target.value) {
      this.listData.push(event.target.value);
      event.target.value = '';
      this.pickDate(this.listData);
    }
  }

  deleteData(idx: number): void {
    this.listData.splice(idx, 1);
  }
}
