import { TestBed } from '@angular/core/testing';

import { SelectBackgroundService } from './select-background.service';

describe('SelectBackgroundService', () => {
  let service: SelectBackgroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectBackgroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
