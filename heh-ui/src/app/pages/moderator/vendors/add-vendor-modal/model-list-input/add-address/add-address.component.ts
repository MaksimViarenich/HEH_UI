import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FiltersService } from 'src/app/services/filter-service/filters.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { customAlphabet } from 'nanoid/non-secure';
import * as _ from 'lodash';

export interface AddressData {
  country: any;
  city: any;
  street: string;
  id: number;
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
    private filterService: FiltersService,
    private matDialogRef: MatDialogRef<any>) {
    this.data = {
      country: {},
      city: {},
      street: '',
      id: 0,
    };
    this.formAddress = new FormGroup({
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }

  changeCitiesList(): void {
    _.forEach(this.countries, (country: any) => {
      if (_.isEqual(country.id, this.data.country.id)) {
        this.cities = country.cities;
      }
    });
  }

  ngOnInit(): void {
    this.countries = this.filterService.countriesCities;
  }

  addAddress(): void {
    const nodeid = customAlphabet('1234567890', 8);
    const generatedId = Number(nodeid());

    this.data.id = this.data.id || generatedId;
    this.matDialogRef.close(this.data);
  }
}
