import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesTagsComponent } from './categories-tags.component';

describe('CategoriesTagsComponent', () => {
  let component: CategoriesTagsComponent;
  let fixture: ComponentFixture<CategoriesTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesTagsComponent ]
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
