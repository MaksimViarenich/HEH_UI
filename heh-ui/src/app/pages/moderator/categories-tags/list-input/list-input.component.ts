import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ToasterService } from '../../../../services/toaster-service/toaster.service';
import { FiltersService } from '../../../../services/filter-service/filters.service';
import { ModalService } from '../../../../services/modal-service/modal.service';

@Component({
  selector: 'app-list-input',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ListInputComponent {
  @Input() label: string;
  @Input() options: any;
  @Input() addElement: any;
  @Input() deleteElement: any;
  @Input() isDisabled?: boolean;
  @Input() activeCategoryId?: any;
  @Output() changeData = new EventEmitter<string>();

  newItem: any;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private filtersService: FiltersService,
    private toaster: ToasterService,
    private modalService: ModalService) {
    this.label = '';
    this.options = [];
  }

  add(item: any): void {
    this.addElement(item, this.changeData);
    this.newItem = '';
  }

  remove(item: any): void {
    const dialogRef = this.modalService.openConfirmModal();
    dialogRef.afterClosed().subscribe((isDelete: any) => {
      if (isDelete) {
        this.deleteElement(item.id, this.changeData);
      }
    });
  }
}
