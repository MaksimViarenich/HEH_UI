import { FavoritesService } from './favorites.service';
import { Component, Input, OnInit } from '@angular/core';
import { Discount } from '../../models/discount';
import { ToasterService } from '../../services/toaster-service/toaster.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  @Input() favoriteInfo: any | undefined;
  favoriteCards: Array<Discount> = [];
  topFavorites: any;
  skipFavorites: any;
  previousScrollPosition: any;
  totalCount: any;

  constructor(private favoritesService: FavoritesService,
              private toaster: ToasterService) {
    this.topFavorites = 8;
    this.skipFavorites = 0;
    this.previousScrollPosition = 0;
    this.totalCount = 0;
  }

  getFavoritesWrapper(filters: any): void {
    this.favoriteCards = [];
    this.skipFavorites = 0;
    this.previousScrollPosition = 0;
    this.getFavorites(this.topFavorites, this.skipFavorites, filters);
  }

  getFavorites(top: any, skip: any, filters?: any): void {
    this.favoritesService.getFavorites(filters, top, skip).subscribe(
      (data: any) => {
        data.value.forEach((favorite: any) => {
          this.favoriteCards.push(favorite);
        });
        this.totalCount = data['@odata.count'];
      },
      () => {
        this.toaster.open('Сan not get favorites');
      }
    );
  }

  getFavoritesAfterDelete(): void {
    this.favoriteCards = [];
    this.skipFavorites = 0;
    this.getFavorites(this.topFavorites, this.skipFavorites);
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !(this.favoriteCards.length === this.totalCount)) {
      this.skipFavorites += this.topFavorites;
      this.getFavorites(this.topFavorites, this.skipFavorites);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }

  ngOnInit(): void {
    this.getFavorites(this.topFavorites, this.skipFavorites);
  }
}
