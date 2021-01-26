import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-search',
  templateUrl: './btn-search.component.html',
  styleUrls: ['./btn-search.component.scss']
})
export class BtnSearchComponent {
  @Output() submitData = new EventEmitter<string>();

  submitClick(): void {
    this.submitData.emit();
  }

  constructor() { }

}
