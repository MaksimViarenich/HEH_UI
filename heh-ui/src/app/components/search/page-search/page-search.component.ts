import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.scss']
})
export class PageSearchComponent {
  @Input() searchOptions: any;

  array: string[] = [];

  onFieldsChangeValue(value: string, idx: number, label: string): void {
    this.array.push(`${idx} ${value} ${label}`);
  }

  onPausedClick(): void {
    this.array = [];
 }
}
