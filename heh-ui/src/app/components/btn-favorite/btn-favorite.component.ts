import { Component, Input, OnInit } from '@angular/core';
import { ToasterService } from 'src/app/services/toaster-service/toaster.service';
import { FavoritesService } from '../../pages/favorites/favorites.service';

@Component({
  selector: 'app-btn-favorite',
  templateUrl: './btn-favorite.component.html',
  styleUrls: ['./btn-favorite.component.scss']
})
export class BtnFavoriteComponent implements OnInit {
  @Input() isFavorite: boolean | undefined;
  @Input() id: string;

  constructor(public favoriteService: FavoritesService,
              private toaster: ToasterService) {
    this.id = '';
  }

  ngOnInit(): void {
  }

  addFavorite(): any {
    this.favoriteService.addUpdateFavorite(this.id, '', 'add').subscribe(
      (data) => {
        this.toaster.open('Discount has been added to favorites', 'success');
      },
      (error) => {
        this.toaster.open('Discount can not be added to favorites');
      }
    );
  }

  deleteFavorite(): any {
    this.favoriteService.deleteFavoriteCard(this.id).subscribe(
      (data) => {
        this.toaster.open('Discount has been removed from favorites', 'success');
      },
      (error) => {
        this.toaster.open('Discount can not be removed from favorites');
      }
    );
  }

  addOrDeleteFavorite(): any {
    this.isFavorite ? this.addFavorite() : this.deleteFavorite();
  }
}
