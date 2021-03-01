import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be login()', () => {
    expect(service.login('user.alexander@mail.com', '0kash914t3')).toBeTruthy();
  });

  it('token should be null', () => {
    localStorage.getItem('isAuth');
    expect(service.getToken()).toBeNull();
  });

});
