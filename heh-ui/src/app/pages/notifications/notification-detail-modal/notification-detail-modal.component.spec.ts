import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDetailModalComponent } from './notification-detail-modal.component';

describe('NotificationDetailModalComponent', () => {
  let component: NotificationDetailModalComponent;
  let fixture: ComponentFixture<NotificationDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationDetailModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
