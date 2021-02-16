import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FiltersService } from '../../pages/discounts/filters.service';
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
  @Output() sendSubmitData = new EventEmitter<any>();
  filtersOptions: any;
  activeFilters: any;
  searchText = '';
  searchData: SearchData = {};
  locationSearch = '';
  tagsSearch = [];
  vendorsSearch = [];

  categoriesFormControl = new FormControl();
  tagsFormControl = new FormControl();
  vendorsFormControl = new FormControl();

  constructor(private filtersService: FiltersService) {
    this.isVendorSearchAvailable = false;
    this.isDateRangeSearchAvailable = false;
    this.activeFilters = {
      categories: []
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
    this.searchData.location = this.locationSearch;
    this.searchData.searchText = this.searchText;
    this.searchData.categories = this.activeFilters.categories;
    this.searchData.tags = this.tagsSearch;
    this.searchData.vendors = this.vendorsSearch;
    this.sendSubmitData.emit(this.searchData);
  }

  changeTagsList(): void {
    this.filtersOptions.tags = [];
    if (this.activeFilters.categories.length) {
      this.filtersOptions.tags = this.filtersService.getFilters().tags.filter((tag: any) => {
        return this.activeFilters.categories.indexOf(tag.categoryId) !== -1;
      });
    } else {
      this.filtersOptions.tags = this.filtersService.getFilters().tags;
    }
  }
}
