import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter, ViewChild } from '@angular/core';
import { FiltersService } from '../../services/filter-service/filters.service';
import { FormControl } from '@angular/forms';
import { isEqual, slice, size, toString, indexOf, forEach, includes, map, find } from 'lodash';

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
  viewLocation: any;
  currentLocation: any;

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
    this.currentLocation = sessionStorage.getItem('location');
    this.submitSearch();
    this.filtersService.loadFilters().then(() => {
      this.filtersOptions = this.filtersService.getFilters();
      this.locations = this.destructurizeLocations(this.filtersOptions.locations);
      this.locationsArrayForOptions = this.fillLocationOptionArray(this.locations);
    });
  }

  destructurizeLocations(locations: any): any {
    const destructurizeArray: { country: any, cities: any }[] = [];
    const countries: Array<string>[] = [];
    forEach(locations, (location) => {
      if (!includes(countries, location.viewValue.split(', ')[0])) {
        countries.push(location.viewValue.split(', ')[0]);
        destructurizeArray.push({
          country: location.viewValue.split(', ')[0],
          cities: this.getCities(location.viewValue.split(', ')[0], locations)
        });
      }
    });

    return destructurizeArray;
  }

  isString(value: any): any {
    return typeof value === 'string';
  }

  fillLocationOptionArray(locations: any): any {
    let array: any = [];
    forEach(locations, (location) => {
      array = isEqual(size(array), 0) ? [location.country, ...location.cities] : [...array, location.country, ...location.cities];
    });

    return array;
  }


  getCities(country: string, locations: any): any {
    const cities: { id: any; city: any; }[] = [];
    forEach(locations, (location) => {
      if (isEqual(location.viewValue.split(', ')[0], country)) {
        cities.push({
          id: location.id,
          city: location.viewValue.split(', ')[1]
        });
      }
    });

    return cities;
  }

  allCitiesAddresses(country: string): any {
    if (country) {
      this.searchData.location = map(find(this.locations, location => location.country === country).cities, city => city.id);
    }
  }

  transformPickerDate(objDate: any): string {
    const pickerDateString = toString(objDate);
    this.month = isEqual(size(objDate.getMonth()), 1) ? `0${(objDate.getMonth() + 1).toString()}` : (objDate.getMonth() + 1).toString();

    return `${slice(pickerDateString, 11, 15)}-` + this.month + `-${slice(pickerDateString, 8, 10)}`;
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

  submitSearch(): void {
    if (!(size(this.currentLocation) < 30)) {
      this.searchData.location = this.currentLocation;
    }
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
