import { FavoritesService } from './favorites.service';
import { Component, Input, OnInit } from '@angular/core';
import { Discount } from '../../models/discount';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../services/modal-service/modal.service';
import { FiltersService } from '../discounts/filters.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  @Input() favoriteInfo: any | undefined;
  favoriteCards: Array<Discount> = [];

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private filtersService: FiltersService,
              private favoritesService: FavoritesService,
              private toaster: ToasterService) {
  }

  ngOnInit(): void {
    this.favoritesService.getFavorites().subscribe(
      (data) => {
        this.favoriteCards = data;
      },
      (error) => {
        this.toaster.open('Сan not get favorites');
      }
    );
  }
}
