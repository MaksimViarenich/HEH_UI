import { Component, OnInit, ViewEncapsulation} from '@angular/core';

interface Loc {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-mono-select',
  templateUrl: './mono-select.component.html',
  styleUrls: ['./mono-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MonoSelectComponent implements OnInit{
  userLocations: Loc[] = [
    {value: 'Minsk', viewValue: 'Belarus'},
    {value: 'Grodno', viewValue: 'Belarus'},
    {value: 'Vinnitsa', viewValue: 'Ukraine'}
  ];
    selectedLocation = this.userLocations[0].value;
  ngOnInit(): void{}
}
