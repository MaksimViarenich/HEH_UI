import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { VendorsComponent } from './vendors.component';
import { GeocodeService } from '../../discounts/discount-details-modal/geocode.service';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';

describe('VendorsComponent', () => {
  let component: VendorsComponent;
  let fixture: ComponentFixture<VendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, TranslateModule.forRoot(), HttpClientTestingModule, MatMenuModule, MatDialogModule ],
      declarations: [ VendorsComponent ],
      providers: [ GeocodeService,
        { provide: MapsAPILoader, useValue: { load: jasmine.createSpy('load').and.returnValue(new Promise(() => true)) }},
        { provide: GoogleMapsAPIWrapper },
        { provide: MatSnackBar },
        { provide: Overlay },
        { provide: MAT_DIALOG_DATA, useValue: { }},
        ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
