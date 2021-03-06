import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddDiscountModalComponent } from './add-discount-modal.component';
import { FiltersService } from '../../../../services/filter-service/filters.service';

describe('AddDiscountModalComponent', () => {
  let component: AddDiscountModalComponent;
  let fixture: ComponentFixture<AddDiscountModalComponent>;

  const dialogMock = {
    backdropClick: () => { }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, TranslateModule.forRoot(), HttpClientTestingModule, MatDialogModule ],
      declarations: [ AddDiscountModalComponent ],
      providers: [ FiltersService, MatSnackBar, Overlay,
        { provide: MAT_DIALOG_DATA, useValue: { }},
        { provide: MatDialogRef, useValue: dialogMock },
        ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiscountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
