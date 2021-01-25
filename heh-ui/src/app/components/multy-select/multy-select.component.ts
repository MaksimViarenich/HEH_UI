import { Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-multy-select',
  templateUrl: './multy-select.component.html',
  styleUrls: ['./multy-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultySelectComponent implements OnInit {
  multiSelectControl = new FormControl([]);
  @Input() label: string;
  @Input() options: string[];

  constructor(){
    this.label = '';
    this.options = [];
  }
  onOptionRemoved(option: string): void {
    const options = this.multiSelectControl.value as string[];
    this.removeFirst(options, option);
    this.multiSelectControl.setValue(['']);
    this.multiSelectControl.setValue(options); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
  ngOnInit(): void {
  }

}
