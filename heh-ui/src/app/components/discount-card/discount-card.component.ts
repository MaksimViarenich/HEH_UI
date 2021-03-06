import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-discount-card',
  templateUrl: './discount-card.component.html',
  styleUrls: ['./discount-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DiscountCardComponent{
  @Input() discount: any | undefined;
  @Input() isViewCountsVisible: boolean | undefined;

  constructor(private categoryService: CategoryService) {}

  searchByCategory(id: any): void {
    this.categoryService.addToStorage(id);
  }
}
