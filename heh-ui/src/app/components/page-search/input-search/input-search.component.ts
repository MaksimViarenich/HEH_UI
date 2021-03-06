import { Component, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})

export class InputSearchComponent implements ControlValueAccessor{
  searchControl = new FormControl();

  constructor(
    @Self() @Optional() public ngControl: NgControl,
  ) {
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  registerOnChange(fn: (value: any) => void): any {
    this.searchControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.searchControl.valueChanges.subscribe(fn);
  }

  writeValue(value: any): void {
    this.searchControl.setValue(value);
  }
}
