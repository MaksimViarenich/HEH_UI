import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { FavoriteCardComponent } from './favorite-card.component';
import { FavoritesService } from '../../pages/favorites/favorites.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';

describe('FavoriteCardComponent', () => {
  let component: FavoriteCardComponent;
  let fixture: ComponentFixture<FavoriteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      declarations: [ FavoriteCardComponent ],
      providers: [ MatDialog, Overlay, FavoritesService, HttpClient, HttpHandler, ToasterService,
        { provide: MatSnackBar },
        { provide: MAT_DIALOG_DATA, useValue: { }},
        { provide: MatDialogRef, useValue: { }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
