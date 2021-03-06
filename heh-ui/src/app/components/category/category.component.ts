import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FiltersService } from '../../services/filter-service/filters.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CategoryComponent {
  @Input() categoryId: string | undefined;

  constructor(private filtersService: FiltersService) {}

  getCategoryName(): string {
    return this.filtersService.getCategoryById(this.categoryId || '');
  }
}
