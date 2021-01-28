import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateEventComponent } from './state-event.component';

describe('StateEventComponent', () => {
  let component: StateEventComponent;
  let fixture: ComponentFixture<StateEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
