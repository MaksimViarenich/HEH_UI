import { Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-mono-select',
  templateUrl: './mono-select.component.html',
  styleUrls: ['./mono-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MonoSelectComponent {
  labelForUserLoc = 'user loc from server';
  baseUserLoc = 'base user loc';
  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware'];
}
