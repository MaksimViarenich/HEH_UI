import { TestBed } from '@angular/core/testing';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';

import { GeocodeService } from '../../pages/discounts/discount-details-modal/geocode.service';
import { ModalService } from './modal.service';
import { HttpLoaderFactory } from '../../app.module';


describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule, RouterTestingModule, TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [ HttpClient ]
          },
        }
      ),
        HttpClientTestingModule],
      providers: [ModalService, GeocodeService, MatSnackBar,
        { provide: MapsAPILoader, useValue: {load: jasmine.createSpy('load').and.returnValue(new Promise(() => true))} },
        { provide: GoogleMapsAPIWrapper },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
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
