import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FiltersService } from './filters.service';

describe('FiltersService', () => {
  let service: FiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(FiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
