import { OnInit } from '@angular/core';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CategoryService } from '../category/category.service';

@Component({
  selector: 'app-discount-card',
  templateUrl: './discount-card.component.html',
  styleUrls: ['./discount-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class DiscountCardComponent implements OnInit {
  @Input() discount: any | undefined;
  @Input() isViewCountsVisible: boolean | undefined;
  dateNow: Date;
  isFutureDiscount: boolean;

  constructor(private categoryService: CategoryService) {
    this.dateNow = new Date();
    this.isFutureDiscount = false;
  }

  searchByCategory(id: any): void {
    this.categoryService.addToStorage(id);
  }

  ngOnInit(): void {
    if (new Date(this.discount.startDate) > this.dateNow) {
      this.isFutureDiscount = true;
    }
  }
}
