import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToasterService } from '../../../../services/toaster-service/toaster.service';
import { FiltersService } from '../../../discounts/filters.service';

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

  newItem: any;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private filtersService: FiltersService,
    private toaster: ToasterService) {
    this.label = '';
    this.options = [];
  }

  add(item: any): void {
    this.addElement(item, this.changeData);
    this.newItem = '';
  }

  remove(item: any): void {
    this.deleteElement(item.id, this.changeData);
  }
}
