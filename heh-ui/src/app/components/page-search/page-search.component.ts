import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FiltersService } from '../../services/filter-service/filters.service';
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
  @Output() applySearch = new EventEmitter<any>();
  filtersOptions: any;
  searchData: any;
  pickerDate: any[];
  maxDate: Date;
  month = '';

  categoriesFormControl = new FormControl();
  tagsFormControl = new FormControl();
  vendorsFormControl = new FormControl();

  constructor(private filtersService: FiltersService) {
    this.maxDate = new Date();
    this.isVendorSearchAvailable = false;
    this.isDateRangeSearchAvailable = false;
    this.searchData = {
      categories: [],
      tags: [],
      vendors: [],
      location: '',
    };
    this.pickerDate = [];
    this.filtersOptions = {
      locations: [],
      categories: [],
      tags: [],
      vendors: []
    };
  }

  async ngOnInit(): Promise<void> {
    this.searchData.location = sessionStorage.getItem('location');
    this.submitSearch();
    this.filtersService.loadFilters().then(() => {
      this.filtersOptions = this.filtersService.getFilters();
    });
  }

  transformPickerDate(objDate: any): string {
    const pickerDateString = objDate.toString();
    this.month = objDate.getMonth().length === 1 ? `0${(objDate.getMonth() + 1).toString()}` : (objDate.getMonth() + 1).toString();

    return `${pickerDateString.slice(11, 15)}-` + this.month + `-${pickerDateString.slice(8, 10)}`;
  }

  changeDate(event: any): void {
    if (event.target.value) {
      this.pickerDate.push(this.transformPickerDate(event.target.value));
    } else {
      this.pickerDate.push(event.target.value);
    }

    this.searchData.startDate = this.pickerDate[0];
    this.searchData.endDate = this.pickerDate[1];

    if (this.pickerDate.length > 1) {
      this.pickerDate = [];
    }
  }

  submitSearch(): void {
    this.applySearch.emit(this.searchData);
    this.pickerDate = [];
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
