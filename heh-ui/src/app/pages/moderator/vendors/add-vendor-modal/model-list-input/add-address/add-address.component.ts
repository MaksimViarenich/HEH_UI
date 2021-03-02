import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FiltersService } from 'src/app/services/filter-service/filters.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { customAlphabet } from 'nanoid/non-secure';
import { ModalService } from 'src/app/services/modal-service/modal.service';
import { cloneDeep, isEqual, forEach } from 'lodash';
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
  pristineAddress: any;
  conditionStreetInput = true;

  constructor(
    private filterService: FiltersService,
    private modalService: ModalService,
    private translateService: TranslateService,
    private matDialogRef: MatDialogRef<any>) {
      this.formAddress = new FormGroup({
        country: new FormControl('', [Validators.required]),
        city: new FormControl(''),
        street: new FormControl('', [Validators.maxLength(50)]),
      });
      this.pristineAddress = cloneDeep(this.formAddress.value);
  }

  changeCitiesList(): void {
      this.formAddress.get('country')?.valueChanges.subscribe((value) => {

      forEach(this.countries, (country: any) => {
        if (isEqual(country.id, value.id)) {
          this.cities = country.cities;
        }
      });
    });
  }

  checkChanges(): any {
    const isChanged = isEqual(this.pristineAddress, this.formAddress.value);
    const confirmData = {
      message: this.translateService.instant('confirmation.change.message'),
      buttonPositive: this.translateService.instant('confirmation.change.button-positive'),
      buttonNegative: this.translateService.instant('confirmation.change.button-negative'),
    };

    if (!isChanged) {
      const dialogRef = this.modalService.openConfirmModal(confirmData);

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.matDialogRef.close('');
        }
      });
    } else {
      this.matDialogRef.close('');
    }
  }

  ngOnInit(): void {
    this.matDialogRef.backdropClick().subscribe(() => {
      this.checkChanges();
    });
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
