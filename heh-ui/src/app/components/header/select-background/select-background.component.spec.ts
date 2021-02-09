import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBackgroundComponent } from './select-background.component';

describe('SelectBackgroundComponent', () => {
  let component: SelectBackgroundComponent;
  let fixture: ComponentFixture<SelectBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
