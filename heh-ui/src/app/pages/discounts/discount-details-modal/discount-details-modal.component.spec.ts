import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';

import { DiscountDetailsModalComponent } from './discount-details-modal.component';
import { GeocodeService } from './geocode.service';
import {GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';
import {ToasterService} from '../../../services/toaster-service/toaster.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Overlay} from '@angular/cdk/overlay';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DiscountsService} from '../discounts.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatMenuModule} from '@angular/material/menu';

describe('DiscountDetailsComponent', () => {
  let component: DiscountDetailsModalComponent;
  let fixture: ComponentFixture<DiscountDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, TranslateModule.forRoot(), HttpClientTestingModule, MatMenuModule ],
      providers: [ GeocodeService,
        { provide: MapsAPILoader, useValue: { load: jasmine.createSpy('load').and.returnValue(new Promise(() => true)) }},
        { provide: GoogleMapsAPIWrapper },
        DiscountsService, HttpHandler,
        { provide: HttpClient },
        ToasterService,
        { provide: MatSnackBar },
        { provide: Overlay },
        { provide: MAT_DIALOG_DATA, useValue: { }},
        { provide: MatDialogRef, useValue: { }}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
