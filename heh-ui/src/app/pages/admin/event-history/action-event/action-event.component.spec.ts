import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionEventComponent } from './action-event.component';

describe('StateEventComponent', () => {
  let component: ActionEventComponent;
  let fixture: ComponentFixture<ActionEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
