import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { PageSearchComponent } from './page-search.component';
import { FiltersService } from '../../services/filter-service/filters.service';

describe('FieldsSearchComponent', () => {
  let component: PageSearchComponent;
  let fixture: ComponentFixture<PageSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, TranslateModule.forRoot(), HttpClientTestingModule, MatMenuModule ],
      declarations: [ PageSearchComponent ],
      providers: [ FiltersService,
        { provide: HttpClient },
        { provide: HttpHandler },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
