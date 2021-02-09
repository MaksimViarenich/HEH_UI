import { Input, Component } from '@angular/core';
import { FiltersService } from '../../pages/discounts/filters.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent {
  @Input() categoryId: string | undefined;
  categoryName: string | undefined;

  constructor(private filtersService: FiltersService) {
  }
  getCategoryName(): string {
    return this.filtersService.getCategoryById(this.categoryId || '');
  }
}
