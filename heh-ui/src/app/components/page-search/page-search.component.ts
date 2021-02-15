import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FiltersService } from '../../pages/discounts/filters.service';
import { FormControl } from '@angular/forms';

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
  searchData: any = {};

  locationFormControl = new FormControl();
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

  getCategoriesValue(arrIds: string[]): string[] {
    const categoriesValues: string[] = [];
    arrIds.map((item: string) => {
      categoriesValues.push(this.filtersService.getCategoryById(item));
    });
    return categoriesValues;
  }

  submitSearch(): void {
    this.searchData.location = this.locationFormControl.value;
    this.searchData.searchText = this.searchText;
    this.searchData.categories = this.getCategoriesValue(this.categoriesFormControl.value);
    this.searchData.tags = this.tagsFormControl.value;
    this.searchData.vendors = this.vendorsFormControl.value;
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
