import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { EditNoteModalComponent } from './edit-note-modal.component';
import { FavoritesService } from '../favorites.service';
import { ToasterService } from '../../../services/toaster-service/toaster.service';

describe('EditNoteModalComponent', () => {
  let component: EditNoteModalComponent;
  let fixture: ComponentFixture<EditNoteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule, TranslateModule.forRoot(), HttpClientTestingModule, MatMenuModule],
      declarations: [ EditNoteModalComponent ],
      providers: [ FavoritesService, ToasterService,
        { provide: MatSnackBar },
        { provide: Overlay },
        { provide: MAT_DIALOG_DATA, useValue: { }},
        { provide: MatDialogRef, useValue: { }}
        ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
