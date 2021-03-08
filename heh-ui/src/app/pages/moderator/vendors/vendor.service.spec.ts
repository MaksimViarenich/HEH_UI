import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { VendorService } from './vendor.service';

describe('VendorService', () => {
  let service: VendorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ VendorService ]
    });
    service = TestBed.inject(VendorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
