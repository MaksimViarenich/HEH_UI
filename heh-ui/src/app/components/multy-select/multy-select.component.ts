import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
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
  @ViewChild('fruitInput') public valueInput: ElementRef<HTMLInputElement> | any;
  @ViewChild('auto') matAutocomplete: MatAutocomplete | undefined;

  labelFromServer = 'label for select';
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  valueCtrl = new FormControl();
  filteredValues: Observable<string[]>;
  valuesFromBack: string[] = ['item1', 'item2', 'item3'];
  allParsedValues: string[] = ['item1', 'item2', 'item3', 'item4', 'item5'];

  constructor() {
    this.filteredValues = this.valueCtrl.valueChanges.pipe(
    startWith(null),
    map((value: string | null) => value ? this._filter(value) : this.allParsedValues.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.valuesFromBack.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.valueCtrl.setValue(null);
  }

  remove(item: string): void {
    const index = this.valuesFromBack.indexOf(item);

    if (index >= 0) {
      this.valuesFromBack.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.valuesFromBack.push(event.option.viewValue);
    this.valueInput.nativeElement.value = '';
    this.valueCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allParsedValues.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
  }

}
