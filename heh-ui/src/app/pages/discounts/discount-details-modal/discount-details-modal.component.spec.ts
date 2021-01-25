import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountDetailsModuleComponent } from './discount-details-modal.component';

describe('DiscountDetailsComponent', () => {
  let component: DiscountDetailsModuleComponent;
  let fixture: ComponentFixture<DiscountDetailsModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountDetailsModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountDetailsModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
