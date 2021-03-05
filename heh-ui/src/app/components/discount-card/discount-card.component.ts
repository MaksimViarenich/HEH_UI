import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ObservableService } from '../category/observable.service';

@Component({
  selector: 'app-discount-card',
  templateUrl: './discount-card.component.html',
  styleUrls: ['./discount-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DiscountCardComponent{
  @Input() discount: any | undefined;
  @Input() isViewCountsVisible: boolean | undefined;

  constructor(private observableService: ObservableService) {}

  searchByCategory(id: any): void {
    this.observableService.addToStorage(id);
  }
}
