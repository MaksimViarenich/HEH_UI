import {Component, OnInit, ViewEncapsulation, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Discount} from '../../../models/discount';
import {FavoritesService} from '../favorites.service';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditNoteModalComponent implements OnInit {
  favorite: any;
  constructor(private favoriteService: FavoritesService,
              @Inject(MAT_DIALOG_DATA) public data: Discount
  ) {
    this.favorite = data;
  }

  updateInfo(): any {
    this.favoriteService.addUpdateFavorite(this.favorite.id, this.favorite.note, 'update').subscribe();
  }

  ngOnInit(): void {
  }
}
