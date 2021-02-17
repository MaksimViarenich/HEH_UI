import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FiltersService } from 'src/app/services/filter-service/filters.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface AddressData {
  country: any;
  city: any;
  street: string;
}

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAddressComponent implements OnInit {
  formAddress: FormGroup;
  countries: Array<any> = [];
  cities: Array<any> = [];
  data: AddressData;

  constructor(
    private filterService: FiltersService) {
    this.data = {
      country: {},
      city: {},
      street: ''
    };
    this.formAddress = new FormGroup({
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
    });
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
