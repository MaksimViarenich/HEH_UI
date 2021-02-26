import { FavoritesService } from '../../pages/favorites/favorites.service';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../services/modal-service/modal.service';
import { Output, EventEmitter } from '@angular/core';
import { ToasterService } from 'src/app/services/toaster-service/toaster.service';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
  styleUrls: ['./favorite-card.component.scss', ],
  encapsulation: ViewEncapsulation.None,
})

export class FavoriteCardComponent {
  @Input() favoriteInfo: any;
  @Output() updateCardsAfterDelete: EventEmitter<any> = new EventEmitter();
  isVisibleEditNote = true;

  constructor(public dialog: MatDialog,
              private modalService: ModalService,
              private favoriteService: FavoritesService,
              private toaster: ToasterService) {}

  deleteFavorite(): any {
    const dialogRef = this.modalService.openConfirmModal();
    dialogRef.afterClosed().subscribe((isDelete: any) => {
      if (isDelete) {
        this.favoriteService.deleteFavoriteCard(this.favoriteInfo.id).subscribe(
          (data) => {
            this.updateCardsAfterDelete.emit();
            this.toaster.open('Discount has been removed from favorites', 'success');
          },
          (error) => {
            this.toaster.open('Discount can not be removed from favorites');
          }
        );
      }
    });
  }
}
