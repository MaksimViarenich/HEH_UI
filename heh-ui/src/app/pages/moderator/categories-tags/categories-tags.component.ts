import {Component, ViewEncapsulation} from '@angular/core';
import {SelectOption} from '../../../models/select-option';

@Component({
  selector: 'app-categories-tags',
  templateUrl: './categories-tags.component.html',
  styleUrls: ['./categories-tags.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CategoriesTagsComponent {
  categoryOptions: SelectOption;
  tagsOptions: SelectOption;

  constructor() {
    this.categoryOptions = {
      label: 'categories-and-tags.category',
      options: [
        {value: '1', viewValue: 'Food'},
        {value: '2', viewValue: 'Devices'},
        {value: '3', viewValue: 'Medicine'},
        {value: '4', viewValue: 'Beauty'},
        {value: '5', viewValue: 'Sport'}
      ]
    };

    this.tagsOptions = {
      label: 'categories-and-tags.tag',
      options: [
        {value: '1', viewValue: 'Sushi'},
        {value: '2', viewValue: 'Pizza'},
        {value: '3', viewValue: 'Coffe'},
        {value: '4', viewValue: 'China food'}
      ]
    };
  }
}
