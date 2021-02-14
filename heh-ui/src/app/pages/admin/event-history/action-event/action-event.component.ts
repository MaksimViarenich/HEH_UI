import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-event',
  templateUrl: './action-event.component.html',
  styleUrls: ['./action-event.component.scss']
})
export class ActionEventComponent implements OnInit {
  @Input() type: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }
}
