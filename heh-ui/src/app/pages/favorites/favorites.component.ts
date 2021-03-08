import { Component, Input } from '@angular/core';
import { forEach, isEqual, size } from 'lodash';
import { FavoritesService } from './favorites.service';
import { Discount } from '../../models/discount';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { ModalService } from 'src/app/services/modal-service/modal.service';
import { BtnFavoriteService } from 'src/app/services/btn-favorite/btn.favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent {
  @Input() favoriteInfo: any | undefined;
  favoriteCards: Array<Discount> = [];
  topFavorites: any;
  skipFavorites: any;
  previousScrollPosition: any;
  totalCount: any;
  isVisibleEditNote = true;
  filterStorage: any;

  constructor(private favoritesService: FavoritesService,
              private modalService: ModalService,
              private toaster: ToasterService,
              private btnFavotiteService: BtnFavoriteService) {
    this.topFavorites = 8;
    this.skipFavorites = 0;
    this.previousScrollPosition = 0;
    this.totalCount = 0;
    this.filterStorage = {};
    this.btnFavotiteService.currentData.subscribe(data => {
      this.changeFavoriteCurrentList(data);
    });
  }

  changeFavoriteCurrentList(data: any): void {
    this.favoriteCards.forEach((card) => {
      if (data.id === card.id) {
        card.isFavorite = data.isFavorite;
      }
    });
  }

  openDiscountDetailModal(favoriteCard: any): void {
    const dialogRef = this.modalService.openDiscountDetailsModal(favoriteCard.id, this.isVisibleEditNote, favoriteCard.note);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.favoriteCards = [];
        this.skipFavorites = 0;
        this.previousScrollPosition = 0;
        this.getFavorites(this.topFavorites, this.skipFavorites, this.filterStorage);
      }
    });
  }

  getFavoritesWrapper(filters: any): void {
    this.filterStorage = {};
    this.filterStorage = filters;
    filters.experationDate = true;
    this.favoriteCards = [];
    this.skipFavorites = 0;
    this.previousScrollPosition = 0;
    this.getFavorites(this.topFavorites, this.skipFavorites, filters);
  }

  getFavorites(top: any, skip: any, filters?: any): void {
    this.favoritesService.getFavorites(filters, top, skip).subscribe(
      (data: any) => {
        forEach(data.value, (favorite: any) => {
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
    this.previousScrollPosition = 0;
    this.getFavorites(this.topFavorites, this.skipFavorites, this.filterStorage);
  }

  onScrollDown(event: any): void {
    if (event.currentScrollPosition > this.previousScrollPosition && !isEqual(size(this.favoriteCards), this.totalCount)) {
      this.skipFavorites += this.topFavorites;
      this.getFavorites(this.topFavorites, this.skipFavorites, this.filterStorage);
      this.previousScrollPosition = event.currentScrollPosition;
    }
  }
}
