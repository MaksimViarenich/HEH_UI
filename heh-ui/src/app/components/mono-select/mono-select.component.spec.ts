import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonoSelectComponent } from './mono-select.component';

describe('MonoSelectComponent', () => {
  let component: MonoSelectComponent;
  let fixture: ComponentFixture<MonoSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonoSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonoSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
