import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-categories-tags',
  templateUrl: './categories-tags.component.html',
  styleUrls: ['./categories-tags.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CategoriesTagsComponent {
  btnLabel = 'Add';
  catTegOptions: any;
  items: any = [];

  constructor() {
    this.catTegOptions = {
      label: 'Category',
      options: [
        {value: '1', viewValue: 'Food'},
        {value: '2', viewValue: 'Devices'},
        {value: '3', viewValue: 'Medicine'}
      ]
    };
    this.items = [
      {name: 'Categories',
      title: 'Category',
      options: [
        {name: 'Food'},
        {name: 'Medicine'},
        {name: 'Devices'},
        {name: 'Beauty'},
        {name: 'Sport'}
      ]
    },
      {name: 'Tags',
      title: 'Tag',
      options: [
        {name: 'Sushi'},
        {name: 'Pizza'},
        {name: 'Coffe'},
        {name: 'China food'}
      ]}
    ];
  }
}
