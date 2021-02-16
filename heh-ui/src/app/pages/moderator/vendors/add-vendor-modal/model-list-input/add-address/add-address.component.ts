import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FiltersService } from 'src/app/pages/discounts/filters.service';
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
  formAddress: FormGroup | undefined;
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
    this.formAddress = new FormGroup({
      country: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
    });
  }
}
