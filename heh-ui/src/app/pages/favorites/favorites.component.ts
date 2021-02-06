import { Component, OnInit } from '@angular/core';
import { DiscountCard } from '../../models/discount-card';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor() {}

  favoriteCards: Array<DiscountCard> = [];

  ngOnInit(): void {
  }
}
