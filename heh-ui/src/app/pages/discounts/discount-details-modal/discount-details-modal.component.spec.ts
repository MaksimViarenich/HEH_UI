import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

import { DiscountDetailsModalComponent } from './discount-details-modal.component';
import { GeocodeService } from './geocode.service';

describe('DiscountDetailsComponent', () => {
  let component: DiscountDetailsModalComponent;
  let fixture: ComponentFixture<DiscountDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, TranslateModule.forRoot(), HttpClientModule, MatDialogModule ],
      declarations: [ DiscountDetailsModalComponent ],
      providers: [ GeocodeService, MatSnackBar, Overlay,
        { provide: MapsAPILoader, useValue: { load: jasmine.createSpy('load').and.returnValue(new Promise(() => true)) }},
        { provide: GoogleMapsAPIWrapper },
        { provide: MAT_DIALOG_DATA, useValue: { }},
        { provide: MatDialogRef, useValue: { }},
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
