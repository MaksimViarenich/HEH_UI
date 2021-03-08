import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action-event',
  templateUrl: './action-event.component.html',
  styleUrls: ['./action-event.component.scss']
})

export class ActionEventComponent {
  @Input() type: string | undefined;
}
