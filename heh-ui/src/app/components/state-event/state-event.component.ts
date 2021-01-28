import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-state-event',
  templateUrl: './state-event.component.html',
  styleUrls: ['./state-event.component.scss']
})
export class StateEventComponent implements OnInit {
  @Input() eventField: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }
}
