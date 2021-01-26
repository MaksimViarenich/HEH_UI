import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.scss']
})
export class PageSearchComponent {
  @Input() data?: any[];

  array: string[] = [];

  // tslint:disable-next-line: typedef
  onFieldsChangeValue(value: string, idx: number, label: string){
    this.array.push(`${idx} ${value} ${label}`);
  }

  // tslint:disable-next-line: typedef
  onPausedClick(){
    // console.log(this.array);
    this.array = [];
 }
}
