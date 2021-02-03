import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalService} from '../../services/modal-service/modal.service';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss', ],
  encapsulation: ViewEncapsulation.None,
})

export class FavoriteCardComponent implements OnInit {
  @Input() favoriteInfo: any;

  constructor(public dialog: MatDialog,
              private modalService: ModalService,) {}

  openEditNoteModal(): void {
    this.modalService.openEditNoteModal(this.favoriteInfo);
  }

  ngOnInit(): void {
  }
}
