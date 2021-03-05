import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { isEqual, size, indexOf, forEach, includes, toString } from 'lodash';
import { FiltersService } from '../../services/filter-service/filters.service';
import { ObservableService } from '../category/observable.service';

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
  @Output() applyExport = new EventEmitter<any>();
  filtersOptions: any;
  searchData: any;
  pickerDate: any[];
  maxDate: Date;
  month = '';
  locations: any;
  locationsArrayForOptions: any;

  categoriesFormControl = new FormControl();
  tagsFormControl = new FormControl();
  vendorsFormControl = new FormControl();

  constructor(private filtersService: FiltersService,
              private observableService: ObservableService) {
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

  ngOnInit(): void {
    this.observableService.addToStorage('');
    if (isEqual(sessionStorage.getItem('location'), null)) {
      setTimeout(() => {
        this.loadFilters();
      }, 1000);
    } else {
      this.loadFilters();
    }
    this.observableService.storageChanged.subscribe( (id: string) => {
      if (id === '') {
        this.searchData.categories = [];
      } else {
        this.searchData.categories = [];
        this.searchData.categories.push(id);
        this.submitSearch();
      }
    });
  }

  loadFilters(): any {
    this.filtersService.loadFilters().then(() => {
      this.filtersOptions = this.filtersService.getFilters();
      this.filtersService.getLocations().subscribe(
        (data) => {
          this.locations = data;
          this.locationsArrayForOptions = this.fillLocationOptionArray(this.locations);
          this.searchData.location = sessionStorage.getItem('location');
          this.submitSearch();
        }
      );
    });
  }

  fillLocationOptionArray(locations: any): any {
    let array: any = [];
    forEach(locations, (location) => {
      array = isEqual(size(array), 0) ? [{country: location.country, id: location.id}, ...location.cities] :
      [...array, {country: location.country, id: location.id}, ...location.cities];
    });

    return array;
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

    if (size(this.pickerDate) > 1) {
      this.pickerDate = [];
    }
  }

  checkCountryOrCity(id: string): any {
    id = toString(id);
    let ids: string[] = [];
    forEach(this.locations, country => {
      if (isEqual(country.id, id)) {
        ids = [country.id];
      } else if (includes(country.cities, id)) {
        ids = [country.id, id];
      }
    });

    return ids;
  }

  submitSearch(): void {
    this.searchData.location = this.checkCountryOrCity(this.searchData.location);
    console.log(this.searchData.location);
    this.applySearch.emit(this.searchData);
    this.pickerDate = [];
  }

  changeTagsList(): void {
    this.filtersOptions.tags = [];
    if (size(this.searchData.categories)) {
      this.filtersOptions.tags = this.filtersService.getFilters().tags.filter((tag: any) => {
        return !isEqual(indexOf(this.searchData.categories, tag.categoryId), -1);
      });
    } else {
      this.filtersOptions.tags = this.filtersService.getFilters().tags;
    }
  }

  exportStatistics(): void {
    this.applyExport.emit(this.searchData);
    this.pickerDate = [];
  }
}
