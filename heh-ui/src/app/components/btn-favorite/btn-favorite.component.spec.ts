import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnFavoriteComponent } from './btn-favorite.component';

describe('BtnFavoriteComponent', () => {
  let component: BtnFavoriteComponent;
  let fixture: ComponentFixture<BtnFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnFavoriteComponent ]
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
});
