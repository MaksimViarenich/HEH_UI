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

  constructor(private favoritesService: FavoritesService,
              private toaster: ToasterService) {
  }

  getFavorites(): void {
    this.favoritesService.getFavorites().subscribe(
      (data) => {
        this.favoriteCards = data;
        this.toaster.open('Favorites have been received', 'success');
      },
      (error) => {
        this.toaster.open('Сan not get favorites');
      }
    );
  }

  ngOnInit(): void {
    this.getFavorites();
  }
}
