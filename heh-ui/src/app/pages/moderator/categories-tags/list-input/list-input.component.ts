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
  @Input() editElement: any;
  @Input() deleteElement: any;
  @Input() isDisabled?: any;
  @Input() activeCategoryId?: any;
  @Output() changeData = new EventEmitter<string>();

  newItem: any;
  selectable = true;
  removable = true;
  addOnBlur = true;
  previousName: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private filtersService: FiltersService,
    private toaster: ToasterService,
    private modalService: ModalService) {
    this.label = '';
    this.previousName = '';
    this.options = [];
  }

  add(item: any): void {
    this.addElement(item, this.changeData);
    this.newItem = '';
  }

  changeItem(item: any): void {
    this.previousName = item.name;
    item.isChanged = true;
  }

  cancelChange(item: any): void {
    item.name = this.previousName;
    item.isChanged = false;
    this.previousName = '';
  }

  edit(item: any): void {
    if (item.name === this.previousName) {
      item.isChanged = false;
      this.previousName = '';
    } else {
      this.editElement(item, this.changeData);
    }
  }

  remove(item: any): void {
    const dialogRef = this.modalService.openConfirmModal('Are you sure you want to delete?', 'Delete');
    dialogRef.afterClosed().subscribe((isDelete: any) => {
      if (isDelete) {
        this.deleteElement(item.id, this.changeData);
      }
    });
  }
}
