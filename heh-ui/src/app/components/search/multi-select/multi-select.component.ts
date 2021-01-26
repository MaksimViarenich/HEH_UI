import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultiSelectComponent implements OnInit {
  @Input() label: string;
  @Input() options: string[];
  @Input() index: number;
  @Output() changeValue = new EventEmitter<string>();

  optionsFormControl = new FormControl();

  constructor() {
    this.label = '';
    this.options = [];
    this.index = 0;
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.optionsFormControl.valueChanges.subscribe((value) => {
      this.changeValue.emit(value);
    });
  }
}
