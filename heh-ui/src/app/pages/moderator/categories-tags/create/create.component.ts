import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, Input} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Option {
  name: string;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  @Input() title: string;
  @Input() options: Option[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() {
    this.title = '';
    this.options = [];
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.options.push({name: value.trim()});
    }

    // Reset the input value
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
