import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../user-identity/services/authentication.service';
import { catchError } from 'rxjs/operators';
import { isNotDefined } from '../../shared/utils/utils';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AppRouting } from '../configurations/routing/app-routing';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private readonly _authenticationService: AuthenticationService,
              private readonly _router: Router) {
  }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && isNotDefined(this._authenticationService.token)) {
          this._router.navigateByUrl(AppRouting.trip.root);
        }

        return throwError(err.error);
      }));
  }
}
