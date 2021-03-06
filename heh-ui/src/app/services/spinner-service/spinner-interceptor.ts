import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BASE_API_URL } from 'src/app/global';
import { isEqual } from 'lodash';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable()
export class SpinnerHttpInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!isEqual(req.url, `${BASE_API_URL}/api/notification/count`)) {
      this.spinnerService.show();
    }

    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.spinnerService.hide();
        }
      },
      () => {
        this.spinnerService.hide();
      })
    );
  }
}
