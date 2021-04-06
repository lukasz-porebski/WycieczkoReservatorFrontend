import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { isNotDefined } from '../../../shared/utils/utils';
import { AppRouting } from '../../configurations/routing/app-routing';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly _anonymousUrls: string[] = [
    AppRouting.user.root,
  ];

  constructor(private readonly _authenticationService: AuthenticationService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._anonymousUrls.some(u => request.url.contains(u))) {
      return next.handle(request);
    }

    if (isNotDefined(this._authenticationService.currentTokenValue)) {
      return next.handle(request);
    }

    if (this._authenticationService.currentTokenValue.isAccessTokenActive) {
      return next.handle(this._injectToken(request));
    } else {
      this._authenticationService.logout();
      return next.handle(request);
    }
  }

  private _injectToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: this._authenticationService.currentTokenValue.accessToken,
      },
    });
  }
}
