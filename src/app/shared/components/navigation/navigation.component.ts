import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MenuFirstLevelModel } from './models/menu-first-level.model';
import { MatExpansionPanelHeader } from '@angular/material/expansion';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { isEmpty } from '../../utils/utils';
import { AppIcon } from '../../enums/app-icon.enum';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../core/user-identity/services/authentication.service';
import { AppRouting } from '../../../core/configurations/routing/app-routing';
import { UserRole } from '../../../core/user-identity/enums/user-role.enum';
import { environment } from '../../../../environments/environment';
import { DevelopmentEnvironmentMode } from '../../../../environments/development-environment-mode.enum';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navigation.component.html',
  styleUrls: [ './navigation.component.scss' ],
})
export class NavigationComponent implements OnInit, OnDestroy {
  public readonly translateRoute = 'SHARED.COMPONENTS.';
  public readonly expandedHeight = '48px';
  public readonly menu: MenuFirstLevelModel[] = [];

  private readonly _subscription = new Subscription();

  constructor(
    private readonly _breakpointObserver: BreakpointObserver,
    private readonly _activatedRoute: ActivatedRoute,
    public readonly authenticationService: AuthenticationService,
    private readonly _router: Router) {
  }

  ngOnInit(): void {
    this._addTripsMenu();
    this._tryAddTripCreatorMenu();
    this._tryAddUsersMenu();
    this._tryMyTripsMenu

    this._setActiveMenuElements(this._router.url);

    const sub = this._router.events.subscribe((navEvent) => {
      if (navEvent instanceof NavigationEnd) {
        this._setActiveMenuElements(navEvent.urlAfterRedirects);
      }
    });

    this._subscription.add(sub);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public onMenuOptionClick(tLevel: MatExpansionPanelHeader, menuLevel: MenuFirstLevelModel): void {
    tLevel._toggle();
    this._router.navigateByUrl(menuLevel.navigateUrl);
  }

  public navigateToHome(): void {
    this._router.navigateByUrl('/');
  }

  public onLogout(): void {
    this.authenticationService.logout().subscribe(() =>
      this._router.navigateByUrl(AppRouting.user.logIn.absolutePath));
  }

  private _addTripsMenu(): void {
    const appTranslateRoute = this.translateRoute + 'MENU.TRIPS.';
    const menu = new MenuFirstLevelModel(
      appTranslateRoute + 'MENU_NAME',
      AppRouting.trip.tripsList.absolutePath,
      AppIcon.Trips,
    );
    this.menu.push(menu);
  }

  private _tryAddTripCreatorMenu(): void {
    if (!this._showMenuForAdmin()) {
      return;
    }

    const appTranslateRoute = this.translateRoute + 'MENU.TRIP_CREATOR.';
    const menu = new MenuFirstLevelModel(
      appTranslateRoute + 'MENU_NAME',
      AppRouting.admin.tripCreator.absolutePath,
      AppIcon.Add,
    );
    this.menu.push(menu);
  }

  private _tryAddUsersMenu(): void {
    if (!this._showMenuForAdmin()) {
      return;
    }

    const appTranslateRoute = this.translateRoute + 'MENU.USERS.';
    const menu = new MenuFirstLevelModel(
      appTranslateRoute + 'MENU_NAME',
      AppRouting.admin.usersList.absolutePath,
      AppIcon.Users,
    );
    this.menu.push(menu);
  }

  private _tryMyTripsMenu(): void{
    if (!this._showMenuForUser()) {
      return;
    }

    const appTranslateRoute = this.translateRoute + 'MENU.MYTRIPS.';
    const menu = new MenuFirstLevelModel(
      appTranslateRoute + 'MENU_NAME',
      AppRouting.user.myTrips.absolutePath,
      AppIcon.Lock,
    );
    this.menu.push(menu);

  }

  private _setActiveMenuElements(url: string): void {
    if (isEmpty(url)) {
      return;
    }
    this.menu.forEach(m => m.isActive = url.contains(m.navigateUrl));
  }

  private _showMenuForAdmin(): boolean {
    if (this.authenticationService.token?.userRole === UserRole.Admin) {
      return true;
    }

    if (environment.mode === DevelopmentEnvironmentMode.FullAccess) {
      return true;
    }

    return false;
  }

  private _showMenuForUser(): boolean {
    if (this.authenticationService.token?.userRole === UserRole.User) {
      return true;
    }

    if (environment.mode === DevelopmentEnvironmentMode.FullAccess) {
      return true;
    }

    return false;
  }
}
