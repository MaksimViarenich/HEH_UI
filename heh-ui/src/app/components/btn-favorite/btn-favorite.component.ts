import {Component, Input, OnInit} from '@angular/core';
import { FavoritesService } from './../../pages/favorites/favorites.service';

@Component({
  selector: 'app-btn-favorite',
  templateUrl: './btn-favorite.component.html',
  styleUrls: ['./btn-favorite.component.scss']
})
export class BtnFavoriteComponent implements OnInit {
  @Input() isFavorite: boolean | undefined;
  @Input() id: string;

  constructor(public favoriteService: FavoritesService) {
    this.id = '';
  }

  ngOnInit(): void {
  }

  addFavorite(): any {
    this.favoriteService.addToFavorite(this.id).subscribe();
  }

  deleteFavorite(): any {
    this.favoriteService.deleteFavoriteCard(this.id).subscribe();
  }

  addOrDeleteFavorite(): any {
    this.isFavorite ? this.addFavorite() : this.deleteFavorite();
  }
}
