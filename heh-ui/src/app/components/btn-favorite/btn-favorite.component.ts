import { Component, Input } from '@angular/core';
import { BtnFavoriteService } from 'src/app/services/btn-favorite/btn.favorite.service';
import { ToasterService } from 'src/app/services/toaster-service/toaster.service';
import { FavoritesService } from '../../pages/favorites/favorites.service';

@Component({
  selector: 'app-btn-favorite',
  templateUrl: './btn-favorite.component.html',
  styleUrls: ['./btn-favorite.component.scss']
})

export class BtnFavoriteComponent {
  @Input() isFavorite: boolean | undefined;
  @Input() id: string;
  data: any = {};

  constructor(public favoriteService: FavoritesService,
              private toaster: ToasterService,
              private btnFavotiteService: BtnFavoriteService) {
    this.id = '';
  }

  addFavorite(): any {
    this.favoriteService.addUpdateFavorite(this.id, '', 'add').subscribe(
      () => {
        this.toaster.open('Discount has been added to favorites', 'success');
      },
      () => {
        this.toaster.open('Discount can not be added to favorites');
      }
    );
  }

  deleteFavorite(): any {
    this.favoriteService.deleteFavoriteCard(this.id).subscribe(
      () => {
        this.toaster.open('Discount has been removed from favorites', 'success');
      },
      () => {
        this.toaster.open('Discount can not be removed from favorites');
      }
    );
  }

  sendIsfavorite(): void {
    this.data.id = this.id;
    this.data.isFavorite = this.isFavorite;
    this.btnFavotiteService.updateIsFavorite(this.data);
  }

  changeFavorite(event: Event): any {
    this.isFavorite = !this.isFavorite;
    event.stopPropagation();
    this.isFavorite ? this.addFavorite() : this.deleteFavorite();
    this.sendIsfavorite();
  }
}
