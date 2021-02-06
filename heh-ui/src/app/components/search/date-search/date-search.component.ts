import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-date-search',
  templateUrl: './date-search.component.html',
  styleUrls: ['./date-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateSearchComponent implements OnInit {
  @Input() label: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
