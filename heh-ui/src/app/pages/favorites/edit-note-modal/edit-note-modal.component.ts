import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'src/app/services/toaster-service/toaster.service';
import { Discount } from '../../../models/discount';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditNoteModalComponent implements OnInit {
  favorite: any;
  initialValue: string;
  editingValue: string;

  constructor(private favoriteService: FavoritesService,
              private toaster: ToasterService,
              @Inject(MAT_DIALOG_DATA) public data: Discount
  ) {
    this.favorite = data;
    this.initialValue = this.favorite.note;
    this.editingValue = this.favorite.note;
  }

  updateInfo(): any {
    this.favorite.note = this.editingValue;

    this.favoriteService.addUpdateFavorite(this.favorite.id, this.editingValue, 'update').subscribe(
      () => {
        this.toaster.open('Information has been updated', 'success');
      },
      (error) => {
        const errorMessage = error.error.errors.hasOwnProperty('Note') ? error.error.errors.Note[0] : 'Information hasn\'t been updated';
        this.toaster.open(errorMessage);
      }
    );
  }

  ngOnInit(): void {
  }
}
