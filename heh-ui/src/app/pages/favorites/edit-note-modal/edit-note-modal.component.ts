import {Component, OnInit, ViewEncapsulation, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Favorites} from '../../../models/favorite';
import {FavoritesService} from '../favorites.service';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditNoteModalComponent implements OnInit {
  favoriteCards: any;
  constructor(private favoriteService: FavoritesService,
              @Inject(MAT_DIALOG_DATA) public data: Favorites
  ) {
    this.favoriteCards = data;
  }

  ngOnInit(): void {
  }
}
