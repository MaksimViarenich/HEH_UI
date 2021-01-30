import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-btn-search',
  templateUrl: './btn-search.component.html',
  styleUrls: ['./btn-search.component.scss']
})
export class BtnSearchComponent {
  @Output() submitData = new EventEmitter<string>();
  @Input() label: string;

  submitClick(): void {
    this.submitData.emit();
  }

  someMethod(): void {}

  constructor() {
    this.label = '';
  }
}
