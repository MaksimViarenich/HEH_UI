import { Component, OnInit, ViewEncapsulation} from '@angular/core';

interface Location {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent {
  userLocations: Location[] = [
    {value: 'Minsk', viewValue: 'Belarus'},
    {value: 'Grodno', viewValue: 'Belarus'},
    {value: 'Vinnitsa', viewValue: 'Ukraine'}
  ];
    selectedLocation = this.userLocations[0].value;
}
