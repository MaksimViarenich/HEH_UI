import { Tag } from './../../models/tag';
import { Observable } from 'rxjs';
import { CategoryService } from './../category/category.service';
import { DiscountCardService } from './discount-card.service';
import { Category } from './../../models/category';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-discount-card',
  templateUrl: './discount-card.component.html',
  styleUrls: ['./discount-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DiscountCardComponent implements OnInit {
  @Input() discountInfo: any | undefined;
  categories: Array<Category> = [];
  categoryName = '';

  constructor(private discountService: DiscountCardService,
              private categoryService: CategoryService) { }

  getCategoryName(categories: Array<Category>, categoryKey: string): any {
    categories.forEach(category => {
      console.log(category);
      if (category.id === categoryKey) {
        this.categoryName = category.name;
      }
    });
  }

  getTags(tags: Array<Tag>, categoryName: string, categories: Array<Category>): any {
    
  }

  ngOnInit(): void {
    // this.discountService.getDiscount(this.discountInfo.id).subscribe(
    //   (data) => {
    //     console.log(data);
    //   }
    // );
    this.categoryService.getCategory().subscribe(
      (data) => {
        this.categories = data;
        this.getCategoryName(data, this.discountInfo.categoryId);
      }
    );

  }
}
