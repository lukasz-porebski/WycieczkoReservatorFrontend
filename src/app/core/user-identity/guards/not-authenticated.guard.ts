import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AppRouting } from '../../configurations/routing/app-routing';

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
    if (!this._authenticationService.isUserLogIn) {
      return true;
    }

    this._router.navigateByUrl(AppRouting.home.root);
    return false;
  }

}
