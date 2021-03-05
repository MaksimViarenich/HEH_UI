import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { FavoritesService } from '../../pages/favorites/favorites.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogComponent ],
      providers: [ MatDialog, Overlay, FavoritesService, ToasterService,
        { provide: MAT_DIALOG_DATA, useValue: { }},
        { provide: MatDialogRef, useValue: { }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
