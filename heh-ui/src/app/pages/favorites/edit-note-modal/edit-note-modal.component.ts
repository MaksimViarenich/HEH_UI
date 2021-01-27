import {Component, OnInit, ViewEncapsulation, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DiscountCard} from '../../../models/discount-card';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.component.html',
  styleUrls: ['./edit-note-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class EditNoteModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DiscountCard
  ) {
  }

  ngOnInit(): void {
  }

}
