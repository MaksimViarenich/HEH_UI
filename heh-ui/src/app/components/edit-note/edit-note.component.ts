import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FavoriteCardComponent } from '../favorite-card/favorite-card.component';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditNoteComponent implements AfterViewInit {

  @ViewChild(FavoriteCardComponent) child: any;

  bgVendor: string = '';
  discountVendorName: string = '';
  discountName: string = '';
  discountNote: string = '';

  ngAfterViewInit() {
    setTimeout(() => {
      this.bgVendor = this.child.bgVendor;
      this.discountVendorName = this.child.discountVendorName;
      this.discountName = this.child.discountName;
      this.discountNote = this.child.discountNote;
    }, 0);
  }

  constructor() { }

  ngOnInit(): void {

  }
}
