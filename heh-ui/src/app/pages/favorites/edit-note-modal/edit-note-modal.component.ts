import {Component, OnInit, ViewEncapsulation, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Discount} from '../../../models/discount';

export interface EditNoteModal {
  bgVendor: string;
  discount: Discount;
}

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditNoteModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EditNoteModal
  ) {
  }

  ngOnInit(): void {
  }

}
