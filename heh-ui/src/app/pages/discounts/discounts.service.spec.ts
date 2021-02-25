import { TestBed } from '@angular/core/testing';

import { DiscountsService } from './discounts.service';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserProfileService } from '../user-profile/user-profile.service';
import { FavoritesService } from '../favorites/favorites.service';

describe('DiscountsService', () => {
  let service: DiscountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserTestingModule, HttpClientModule ],
      providers: [ UserProfileService, FavoritesService, DiscountsService, HttpClient ]
    });
    service = TestBed.inject(DiscountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
