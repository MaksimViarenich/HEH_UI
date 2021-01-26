import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-btn-search',
  templateUrl: './btn-search.component.html',
  styleUrls: ['./btn-search.component.scss']
})
export class BtnSearchComponent {
  @Output() submitData = new EventEmitter<string>();

  // tslint:disable-next-line: typedef
  submitClick(){
    this.submitData.emit();
  }

  constructor() { }

}
