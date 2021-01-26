import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsSearchComponent } from './fields-search.component';

describe('FieldsSearchComponent', () => {
  let component: FieldsSearchComponent;
  let fixture: ComponentFixture<FieldsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
