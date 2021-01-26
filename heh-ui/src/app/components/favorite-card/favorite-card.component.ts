import { Component, OnInit, ViewEncapsulation, Inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteModalComponent } from '../../pages/favorites/edit-note-modal/edit-note-modal.component';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss', ],
  encapsulation: ViewEncapsulation.None,
})

export class FavoriteCardComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  discountInfo = {
    bgVendor: '../../../assets/images/card-backgrounds/bg-vendor-green.png',
    discount: {
      vendor: 'Domino\'s pizza',
      title: 'Buy our tasty pizza with 10% discount loafsdfasdf asdfasdfa sdfas fasdf asdfasdf asdfa sdfasdfasdf asdf asd f',
      feedback: 'Pepperoni pizza  is tastier with double cheese',
      category: 'Food',
      tags: ['Pizza'],
    }
  };

  editNote(): void {
    const dialogRef = this.dialog.open(EditNoteModalComponent, {data: this.discountInfo});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }
}
