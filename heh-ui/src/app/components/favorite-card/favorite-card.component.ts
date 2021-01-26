import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DiscountCard} from 'src/app/models/discount-card';
import {EditNoteModalComponent} from '../../pages/favorites/edit-note-modal/edit-note-modal.component';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss', ],
  encapsulation: ViewEncapsulation.None,
})

export class FavoriteCardComponent implements OnInit {
  @Input() favoriteInfo: DiscountCard | undefined;

  constructor(public dialog: MatDialog) {
  }

  editNote(): void {
    const dialogRef = this.dialog.open(EditNoteModalComponent, {data: this.favoriteInfo});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }
}
