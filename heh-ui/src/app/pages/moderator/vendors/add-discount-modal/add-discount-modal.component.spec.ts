import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiscountModalComponent } from './add-discount-modal.component';

describe('AddDiscountModalComponent', () => {
  let component: AddDiscountModalComponent;
  let fixture: ComponentFixture<AddDiscountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiscountModalComponent ]
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
