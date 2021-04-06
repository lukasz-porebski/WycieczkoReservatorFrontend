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
    this.menu.push(this._tripsMenu());
    this.menu.push(this._tripCreatorMenu());
    this.menu.push(this._usersMenu());

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

  private _tripsMenu(): MenuFirstLevelModel {
    const appTranslateRoute = this.translateRoute + 'MENU.TRIPS.';

    return new MenuFirstLevelModel(
      appTranslateRoute + 'MENU_NAME',
      AppRouting.trip.tripsList.absolutePath,
      AppIcon.Trips,
    );
  }

  private _tripCreatorMenu(): MenuFirstLevelModel {
    const appTranslateRoute = this.translateRoute + 'MENU.TRIP_CREATOR.';

    return new MenuFirstLevelModel(
      appTranslateRoute + 'MENU_NAME',
      AppRouting.admin.tripCreator.absolutePath,
      AppIcon.Add,
    );
  }

  private _usersMenu(): MenuFirstLevelModel {
    const appTranslateRoute = this.translateRoute + 'MENU.USERS.';

    return new MenuFirstLevelModel(
      appTranslateRoute + 'MENU_NAME',
      AppRouting.admin.usersList.absolutePath,
      AppIcon.Users,
    );
  }

  private _setActiveMenuElements(url: string): void {
    if (isEmpty(url)) {
      return;
    }
    this.menu.forEach(m => m.isActive = url.contains(m.navigateUrl));
  }
}
