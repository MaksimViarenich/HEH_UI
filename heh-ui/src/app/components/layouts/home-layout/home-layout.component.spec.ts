import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeLayoutComponent } from './home-layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeLayoutComponent', () => {
  let component: HomeLayoutComponent;
  let fixture: ComponentFixture<HomeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, TranslateModule.forRoot(), HttpClientTestingModule, MatMenuModule ],
      declarations: [ HomeLayoutComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
