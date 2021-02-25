import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProfileService } from './profile.service';

describe('SelectBackgroundService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
