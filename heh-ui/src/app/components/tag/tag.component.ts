import { Component, Input, ViewEncapsulation } from '@angular/core';

import { FiltersService } from '../../services/filter-service/filters.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TagComponent {
  @Input() tagId: string | undefined;
  tagName: string | undefined;

  constructor(private filtersService: FiltersService) {
  }

  getTagName(): string {
    return this.tagName = this.filtersService.getTagById(this.tagId || '');
  }
}
