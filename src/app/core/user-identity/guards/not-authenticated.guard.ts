import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AppRouting } from '../../configurations/routing/app-routing';
import { environment } from '../../../../environments/environment';
import { DevelopmentEnvironmentMode } from '../../../../environments/development-environment-mode.enum';

@Injectable({
  providedIn: 'root',
})
export class NotAuthenticatedGuard implements CanActivate {
  constructor(
    private readonly _router: Router,
    private readonly _authenticationService: AuthenticationService) {
  }

  public canActivate(next: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (environment.mode === DevelopmentEnvironmentMode.FullAccess) {
      return true;
    }

    if (!this._authenticationService.isUserLogIn) {
      return true;
    }

    this._router.navigateByUrl(AppRouting.trip.tripsList.absolutePath);
    return false;
  }
}
