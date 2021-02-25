import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';

import { VendorCardComponent } from './vendor-card.component';
import { VendorService } from '../vendor.service';
import { ModalService } from '../../../../services/modal-service/modal.service';
import { ToasterService } from '../../../../services/toaster-service/toaster.service';

describe('VendorCardComponent', () => {
  let component: VendorCardComponent;
  let fixture: ComponentFixture<VendorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, MatDialogModule ],
      declarations: [ VendorCardComponent ],
      providers: [ VendorService, ModalService, ToasterService,
        { provide: MatSnackBar },
        { provide: Overlay }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
