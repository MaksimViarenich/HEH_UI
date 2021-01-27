import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavModeratorAdminComponent } from './nav-moderator-admin.component';

describe('NavModeratorAdminComponent', () => {
  let component: NavModeratorAdminComponent;
  let fixture: ComponentFixture<NavModeratorAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavModeratorAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavModeratorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
