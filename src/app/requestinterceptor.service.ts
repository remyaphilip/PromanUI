import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorhandlerService } from './errorhandler.service';
import 'rxjs/add/operator/do';


@Injectable()
export class RequestinterceptorService implements HttpInterceptor {

  constructor(public errorHandler: ErrorhandlerService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    request = request.clone({
      withCredentials: true
    });
    return next.handle(request).do((event: HttpEvent<any>) => { }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this.errorHandler.handleError(err);
      }
    })
  }

}
