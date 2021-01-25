import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FavoriteCardComponent } from '../../../components/favorite-card/favorite-card.component';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditNoteModalComponent implements OnInit {

  @Inject(MAT_DIALOG_DATA) public data: object | undefined;

  ngOnInit(): void {
  }

}