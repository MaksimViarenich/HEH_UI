import { Component, Input} from '@angular/core';
@Component({
  selector: 'app-fields-search',
  templateUrl: './fields-search.component.html',
  styleUrls: ['./fields-search.component.scss']
})
export class FieldsSearchComponent {
  @Input() data?: any[];
}
