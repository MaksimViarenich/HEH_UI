import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorModalComponent } from '../add-vendor-modal/add-vendor-modal.component';

describe('AddDiscountModalComponent', () => {
  let component: AddVendorModalComponent;
  let fixture: ComponentFixture<AddVendorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddVendorModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
