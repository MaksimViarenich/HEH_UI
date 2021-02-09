import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, Input} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {Option} from '../../../../models/option';

@Component({
  selector: 'app-list-input',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.scss']
})

export class ListInputComponent {
  @Input() label: string;
  @Input() options: Option[];
  @Input() isDisabled?: boolean;

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() {
    this.label = '';
    this.options = [];
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.options.push({
        viewValue: value.trim(),
        id: value.trim(),
      });
    }

    if (input) {
      input.value = '';
    }
  }

  remove(item: Option): void {
    const index = this.options.indexOf(item);

    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }
}
