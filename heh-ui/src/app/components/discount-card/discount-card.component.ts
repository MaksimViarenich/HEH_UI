import { OnInit } from '@angular/core';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BtnFavoriteService } from 'src/app/services/btn-favorite/btn.favorite.service';
import { CategoryService } from '../category/category.service';
import { isEqual } from 'lodash';

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

  constructor(private categoryService: CategoryService,
              private btnFavotiteService: BtnFavoriteService) {
    this.dateNow = new Date();
    this.isFutureDiscount = false;
  }

  searchByCategory(id: any): void {
    this.categoryService.addToStorage(id);
  }

  changeIsFavorite(data: any): void {
    if (isEqual(data.id, this.discount.id)) {
      this.discount.isFavorite = data.isFavorite;
    }
  }

  ngOnInit(): void {
    if (new Date(this.discount.startDate) > this.dateNow) {
      this.isFutureDiscount = true;
    }
    this.btnFavotiteService.currentData.subscribe(data => {
      this.changeIsFavorite(data);
    });
  }
}
