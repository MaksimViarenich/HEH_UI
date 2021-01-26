import { Component, ViewEncapsulation, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-multy-select',
  templateUrl: './multy-select.component.html',
  styleUrls: ['./multy-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultySelectComponent {
  @Input() label: string;
  @Input() options: string[];

  optionsFormControl = new FormControl();

  constructor(){
    this.label = '';
    this.options = [];
  }
}
