import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { DiscountsComponent } from './discounts.component';
import { ToasterService } from '../../services/toaster-service/toaster.service';

describe('DiscountsComponent', () => {
  let component: DiscountsComponent;
  let fixture: ComponentFixture<DiscountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatDialogModule, BrowserAnimationsModule, HttpClientModule ],
      declarations: [ DiscountsComponent ],
      providers: [ ToasterService, MatSnackBar, Overlay ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
