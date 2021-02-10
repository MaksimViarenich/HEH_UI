import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FiltersService } from 'src/app/pages/discounts/filters.service';

export interface AddressData {
    countryId: string;
    cityId: string;
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
  activeCities: string[] = [];
  countriesCities: any;

  constructor(
    private filterService: FiltersService,
    public dialogRef: MatDialogRef<AddAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddressData) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    showCitiesList(id: string): void {
      this.activeCities = [];
      this.countriesCities.forEach((item: any) => {
        if (item.id === id) {
          for (const city of item.cities) {
            this.activeCities.push(city.name);
          }
        }
      });
    }

    getCountriesAndCities(): void {
      this.countriesCities.forEach((item: any) => {
        const country: any = {};
        country.countryId = item.id;
        country.country = item.country;
        this.countries.push(country);
      });

      this.countriesCities.forEach((country: any) => {
          for (const item of country.cities) {
            const city: any = {};
            city.cityId = item.id;
            city.city = item.name;
            this.cities.push(city);
          }
      });
    }

    ngOnInit(): void {
      this.countriesCities = this.filterService.countriesCities;
      this.getCountriesAndCities();
    }
}
