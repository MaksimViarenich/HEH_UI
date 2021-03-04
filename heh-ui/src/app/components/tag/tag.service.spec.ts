import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TagService } from './tag.service';

describe('TagService', () => {
  let service: TagService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(TagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
