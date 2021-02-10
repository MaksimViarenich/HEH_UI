import { FavoritesService } from './../../pages/favorites/favorites.service';
import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalService} from '../../services/modal-service/modal.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss', ],
  encapsulation: ViewEncapsulation.None,
})

export class FavoriteCardComponent implements OnInit {
  @Input() favoriteInfo: any;
  @Output() favoriteItemDelete: EventEmitter<string> = new EventEmitter();

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private favoriteService: FavoritesService) {}

  openEditNoteModal(): void {
    this.modalService.openEditNoteModal(this.favoriteInfo);
  }

  deleteFavorite(): any {
    this.favoriteItemDelete.emit(this.favoriteInfo.id);

    this.favoriteService.deleteFavoriteCard(this.favoriteInfo.id).subscribe();
  }

  ngOnInit(): void {
  }
}
