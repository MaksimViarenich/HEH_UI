import { TestBed } from '@angular/core/testing';

import { DiscountCardService } from './discount-card.service';

describe('DiscountCardService', () => {
  let service: DiscountCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
