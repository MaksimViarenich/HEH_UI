import {Component, Input, OnInit} from '@angular/core';
import {FiltersService} from '../../pages/discounts/filters.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tagId: string | undefined;
  tagName: string | undefined;

  constructor(private filtersService: FiltersService) {
  }

  ngOnInit(): void {
    this.tagName = this.filtersService.getTagById(this.tagId || '');
  }
}
