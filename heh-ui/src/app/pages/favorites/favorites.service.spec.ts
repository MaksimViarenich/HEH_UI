import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { FavoritesService } from './favorites.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { DiscountsService } from '../discounts/discounts.service';

describe('DiscountsService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ UserProfileService, DiscountsService,
        { provide: HttpClient}
        ]
    });
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
