import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {ToasterService} from '../../../../services/toaster-service/toaster.service';
import {FiltersService} from '../../../discounts/filters.service';

@Component({
  selector: 'app-list-input',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.scss']
})

export class ListInputComponent {
  @Input() label: string;
  @Input() options: any;
  @Input() addElement: any;
  @Input() deleteElement: any;
  @Input() isDisabled?: boolean;
  @Input() activeCategoryId?: any;
  @Output() changeData = new EventEmitter<string>();

  newCategory: any;
  categoryObj: any;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private filtersService: FiltersService,
    private toaster: ToasterService) {
    this.label = '';
    this.options = [];
    this.categoryObj = {};
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (input) {
      input.value = '';
    }

    this.addElement(value, this.changeData);
  }

  remove(item: any): void {
    this.deleteElement(item.id, this.changeData);
  }
}
