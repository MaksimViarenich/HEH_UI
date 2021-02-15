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

  constructor(private favoriteService: FavoritesService,
              private toaster: ToasterService,
              @Inject(MAT_DIALOG_DATA) public data: Discount
  ) {
    this.favorite = data;
    this.initialValue = this.favorite.note;
  }

  updateInfo(): any {
    this.favoriteService.addUpdateFavorite(this.favorite.id, this.favorite.note, 'update').subscribe(
      (data) => {
        this.toaster.open('Information has been updated', 'success');
      },
      (error) => {
        this.toaster.open('Information hasn\'t been updated');
      }
    );
  }

  ngOnInit(): void {
  }
}
