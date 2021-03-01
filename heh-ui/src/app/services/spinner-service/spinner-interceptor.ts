import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { BASE_API_URL } from 'src/app/global';
import * as _ from 'lodash';

@Injectable()
export class SpinnerHttpInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (_.isEqual(req.url, `${BASE_API_URL}/api/notification/count`)) {
      this.spinnerService.show();
    }

    return next
      .handle(req)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.hide();
          }
        }, (error) => {
          this.spinnerService.hide();
        })
      );
  }
}
