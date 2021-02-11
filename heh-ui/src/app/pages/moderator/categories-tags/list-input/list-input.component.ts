import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, Input} from '@angular/core';
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

    if ((value || '').trim()) {
      this.options.push({
        name: value.trim(),
        id: value.trim(),
      });
    }

    if (input) {
      input.value = '';
    }
    this.categoryObj.name = this.newCategory;
    this.filtersService.addNewCategory(this.categoryObj).subscribe(
      (data) => {
        this.toaster.open('New category has been added', 'success');
      },
      (error) => {
        this.toaster.open('There is no possibility to add a new category');
      }
    );
  }

  remove(item: any): void {
    const index = this.options.indexOf(item);

    if (index >= 0) {
      this.options.splice(index, 1);
    }
    this.filtersService.deleteCategory(item.id).subscribe(
      (data) => {
        this.toaster.open('Category has been deleted', 'success');
      },
      (error) => {
        this.toaster.open('There is no possibility to delete this category');
      }
    );
  }
}
