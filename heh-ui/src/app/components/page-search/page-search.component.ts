import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FiltersService } from '../../services/filter-service/filters.service';
import { FormControl } from '@angular/forms';
import { SearchData } from '../../models/search-data';

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageSearchComponent implements OnInit {
  @Input() isVendorSearchAvailable: boolean;
  @Input() isDateRangeSearchAvailable: boolean;
  @Output() applySearch = new EventEmitter<any>();
  filtersOptions: any;
  searchData: any;

  categoriesFormControl = new FormControl();
  tagsFormControl = new FormControl();
  vendorsFormControl = new FormControl();

  constructor(private filtersService: FiltersService) {
    this.isVendorSearchAvailable = false;
    this.isDateRangeSearchAvailable = false;
    this.searchData = {
      categories: [],
      tags: [],
      vendors: []
    };
    this.filtersOptions = {
      locations: [],
      categories: [],
      tags: [],
      vendors: []
    };
  }

  ngOnInit(): void {
    this.filtersService.loadFilters().then(() => {
      this.filtersOptions = this.filtersService.getFilters();
    });
  }

  submitSearch(): void {
    this.applySearch.emit(this.searchData);
  }

  changeTagsList(): void {
    this.filtersOptions.tags = [];
    if (this.searchData.categories.length) {
      this.filtersOptions.tags = this.filtersService.getFilters().tags.filter((tag: any) => {
        return this.searchData.categories.indexOf(tag.categoryId) !== -1;
      });
    } else {
      this.filtersOptions.tags = this.filtersService.getFilters().tags;
    }
  }
}
