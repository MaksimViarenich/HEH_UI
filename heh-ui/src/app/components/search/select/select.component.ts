import { Component, Input, ViewEncapsulation} from '@angular/core';
import { Option } from 'src/app/models/option';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SelectComponent {
  @Input() options: Option[];
  @Input() label: string;

  selectedOption = '';

  constructor() {
    this.options = [];
    this.label = '';
  }
}
