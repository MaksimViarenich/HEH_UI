import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesToggleComponent } from './themes-toggle.component';

describe('ThemesToggleComponent', () => {
  let component: ThemesToggleComponent;
  let fixture: ComponentFixture<ThemesToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemesToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
