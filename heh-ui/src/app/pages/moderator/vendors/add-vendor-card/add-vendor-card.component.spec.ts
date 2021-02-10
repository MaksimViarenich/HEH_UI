import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddVendorCardComponent } from './add-vendor-card.component';

describe('VendorCardComponent', () => {
  let component: AddVendorCardComponent;
  let fixture: ComponentFixture<AddVendorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVendorCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
