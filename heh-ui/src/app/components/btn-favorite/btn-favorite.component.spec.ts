import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BtnFavoriteComponent } from './btn-favorite.component';

describe('BtnFavoriteComponent', () => {
  let component: BtnFavoriteComponent;
  let fixture: ComponentFixture<BtnFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnFavoriteComponent ],
      imports: [ HttpClientModule, BrowserAnimationsModule ],
      providers: [MatSnackBar, Overlay]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shouldnt add favorite', () => {
    console.log((component.addFavorite()).toBeFalse());
  });
});
