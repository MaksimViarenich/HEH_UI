import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CategoriesTagsComponent } from './categories-tags.component';
import { FiltersService } from '../../../services/filter-service/filters.service';
import { ToasterService } from '../../../services/toaster-service/toaster.service';

describe('CategoriesTagsComponent', () => {
  let component: CategoriesTagsComponent;
  let fixture: ComponentFixture<CategoriesTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule, TranslateModule.forRoot(), HttpClientTestingModule, MatMenuModule ],
      declarations: [ CategoriesTagsComponent ],
      providers: [ FiltersService, ToasterService,
        { provide: MatSnackBar },
        { provide: Overlay}
        ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
