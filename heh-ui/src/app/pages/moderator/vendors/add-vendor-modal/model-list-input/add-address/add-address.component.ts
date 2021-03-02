import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FiltersService } from 'src/app/services/filter-service/filters.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { customAlphabet } from 'nanoid/non-secure';

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
  conditionStreetInput = true;

  constructor(
    private filterService: FiltersService,
    private matDialogRef: MatDialogRef<any>) {
    this.formAddress = new FormGroup({
      country: new FormControl('', [Validators.required]),
      city: new FormControl(''),
      street: new FormControl('', [Validators.maxLength(50)]),
    });
    this.formAddress.get('country')?.valueChanges.subscribe((value) => {
      this.countries.forEach((country: any) => {
        if (country.id === value.id) {
          this.cities = country.cities;
        }
      });
    });
  }

  ngOnInit(): void {
    this.countries = this.filterService.countriesCities;
  }

  setCity(): void {
    this.conditionStreetInput = false;
  }

  generayteId(): number {
    const nodeid = customAlphabet('1234567890', 8);

    return 0 || Number(nodeid());
  }

  addAddress(): void {
    this.matDialogRef.close({...this.formAddress.value, id: this.generayteId()});
  }
}
