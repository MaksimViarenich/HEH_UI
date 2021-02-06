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
      label: 'categories-and-tags.categoryId',
      options: [
        {id: '1', viewValue: 'Food'},
        {id: '2', viewValue: 'Devices'},
        {id: '3', viewValue: 'Medicine'},
        {id: '4', viewValue: 'Beauty'},
        {id: '5', viewValue: 'Sport'}
      ]
    };

    this.tagsOptions = {
      label: 'categories-and-tags.tagId',
      options: [
        {id: '1', viewValue: 'Sushi'},
        {id: '2', viewValue: 'Pizza'},
        {id: '3', viewValue: 'Coffe'},
        {id: '4', viewValue: 'China food'}
      ]
    };
  }
}
