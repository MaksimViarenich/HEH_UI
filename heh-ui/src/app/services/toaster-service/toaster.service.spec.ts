import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

import { ToasterService } from './toaster.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ToasterService', () => {
  let service: ToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, BrowserAnimationsModule ],
      providers: [ ToasterService,
        { provide: MatSnackBar },
        { provide: Overlay}
        ]
    });
    service = TestBed.inject(ToasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
