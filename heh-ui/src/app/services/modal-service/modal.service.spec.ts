import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeocodeService } from '../../pages/discounts/discount-details-modal/geocode.service';
import {GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientModule} from '@angular/common/http';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MatDialogModule, BrowserAnimationsModule, RouterTestingModule, TranslateModule.forRoot(), HttpClientModule ],
      providers: [ ModalService, GeocodeService, MatSnackBar,
        { provide: MapsAPILoader, useValue: { load: jasmine.createSpy('load').and.returnValue(new Promise(() => true)) }},
        { provide: GoogleMapsAPIWrapper },
        { provide: MAT_DIALOG_DATA, useValue: { }},
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    expect(service.openDiscountDetailsModal('1', true, 'qwerty', true, 6)).toBeTruthy();
  });
});
