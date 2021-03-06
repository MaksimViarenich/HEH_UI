import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FavoriteCardComponent } from './favorite-card.component';
import { FavoritesService } from '../../pages/favorites/favorites.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FavoriteCardComponent', () => {
  let component: FavoriteCardComponent;
  let fixture: ComponentFixture<FavoriteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, TranslateModule.forRoot(), HttpClientTestingModule, MatDialogModule, MatSnackBarModule ],
      declarations: [ FavoriteCardComponent ],
      providers: [ MatDialog, Overlay, FavoritesService, ToasterService,
        { provide: MAT_DIALOG_DATA, useValue: { }},
        { provide: MatDialogRef, useValue: { }}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
