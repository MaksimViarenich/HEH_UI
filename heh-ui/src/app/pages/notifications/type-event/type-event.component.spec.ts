import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEventComponent } from './type-event.component';

describe('TypeEventComponent', () => {
  let component: TypeEventComponent;
  let fixture: ComponentFixture<TypeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
