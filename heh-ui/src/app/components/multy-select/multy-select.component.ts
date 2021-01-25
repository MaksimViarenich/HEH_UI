import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation, Input} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-multy-select',
  templateUrl: './multy-select.component.html',
  styleUrls: ['./multy-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MultySelectComponent implements OnInit {
  multiSelectControl = new FormControl([]);
  @Input() label: string | undefined;
  @Input() options: string[] | undefined;

  onOptionRemoved(option: string): void {
    const options = this.multiSelectControl.value as string[];
    this.removeFirst(options, option);
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
