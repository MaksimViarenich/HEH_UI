import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http';

import { AddVendorCardComponent } from './add-vendor-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VendorCardComponent', () => {
  let component: AddVendorCardComponent;
  let fixture: ComponentFixture<AddVendorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
      declarations: [ AddVendorCardComponent ],
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
