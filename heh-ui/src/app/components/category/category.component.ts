import {Input, Component, OnInit} from '@angular/core';
import {FiltersService} from '../../pages/discounts/filters.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  @Input() categoryId: string | undefined;
  categoryName: string | undefined;

  constructor(private filtersService: FiltersService) {}

  ngOnInit(): void {
    this.categoryName = this.filtersService.getCategoryById(this.categoryId || '');
  }
}
