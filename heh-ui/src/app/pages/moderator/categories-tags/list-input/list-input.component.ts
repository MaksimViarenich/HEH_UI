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
  @Input() isDisabled?: boolean;
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

    this.categoryObj.name = value;
    this.filtersService.addNewCategory(this.categoryObj).subscribe(
      (data) => {
        this.toaster.open('New category has been added', 'success');
        this.changeData.emit(value);
      },
      (error) => {
        this.toaster.open('There is no possibility to add a new category');
      }
    );
  }

  remove(item: any): void {
    this.filtersService.deleteCategory(item.id).subscribe(
      (data) => {
        this.toaster.open('Category has been deleted', 'success');
        this.changeData.emit(item.id);
      },
      (error) => {
        this.toaster.open('There is no possibility to delete this category');
      }
    );
  }
}
