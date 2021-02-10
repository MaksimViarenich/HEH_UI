import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FiltersService} from 'src/app/pages/discounts/filters.service';

export interface AddressData {
  country: any;
  city: any;
  street: string;
}

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  countries: Array<any> = [];
  cities: Array<any> = [];
  data: AddressData;

  constructor(
    private filterService: FiltersService) {
    this.data = {
      country: '',
      city: '',
      street: ''
    };
  }

  changeCitiesList(): void {
    this.countries.forEach((country: any) => {
      if (country.id === this.data.country.id) {
        this.cities = country.cities;
      }
    });
  }



  ngOnInit(): void {
    this.countries = this.filterService.countriesCities;
  }
}
