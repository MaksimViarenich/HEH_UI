import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FiltersService } from '../../services/filter-service/filters.service';
import { ObservableService } from './observable.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CategoryComponent {
  @Input() categoryId: string | undefined;
  categoryName: string | undefined;

  constructor(private filtersService: FiltersService,
              private observableService: ObservableService) {}

  getCategoryName(): string {
    return this.filtersService.getCategoryById(this.categoryId || '');
  }

  searchCategory(id: any): void {
    this.observableService.addToStorage(id);
  }
}
