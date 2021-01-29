import { Component, Input, ViewEncapsulation} from '@angular/core';
import { SelectOption } from 'src/app/models/select-option';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SelectComponent {
  @Input() options: SelectOption[];
  @Input() label: string;

  selectedOption = '';

  constructor() {
    this.options = [];
    this.label = '';
  }
}
