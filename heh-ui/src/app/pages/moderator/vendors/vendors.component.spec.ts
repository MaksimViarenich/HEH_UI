import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsComponent } from './vendors.component';
import { DiscountDetailsModalComponent } from '../../discounts/discount-details-modal/discount-details-modal.component';

describe('DiscountDetailsComponent', () => {
  let component: DiscountDetailsModalComponent;
  let fixture: ComponentFixture<DiscountDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountDetailsModalComponent ]
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

describe('VendorsComponent', () => {
  let component: VendorsComponent;
  let fixture: ComponentFixture<VendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorsComponent],
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
