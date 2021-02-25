import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { EventHistoryComponent } from './event-history.component';
import { ToasterService } from '../../../services/toaster-service/toaster.service';

describe('EventHistoryComponent', () => {
  let component: EventHistoryComponent;
  let fixture: ComponentFixture<EventHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, HttpClientModule, MatDialogModule ],
      declarations: [ EventHistoryComponent ],
      providers: [ ToasterService, MatSnackBar, Overlay ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
