import { FavoritesService } from './favorites.service';
import { Component, OnInit } from '@angular/core';
import { Favorites } from '../../models/favorite';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../services/modal-service/modal.service';
import { FiltersService } from '../discounts/filters.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private filtersService: FiltersService,
              private favoritesService: FavoritesService) {}

  favoriteCards: Array<Favorites> = [];

  openEditNoteModal(): void{
    // this.modalService.openEditNoteModal();
  }

  ngOnInit(): void {
    this.favoritesService.getFavorites().subscribe(
      (data) => {
        this.favoriteCards = data.value;
        console.log(data);
      }
    );
  }
}
