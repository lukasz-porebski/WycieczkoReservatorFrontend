import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MenuFirstLevelModel } from './models/menu-first-level.model';
import { MenuSecondLevelModel } from './models/menu-second-level.model';
import { MatExpansionPanelHeader } from '@angular/material/expansion';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { isEmpty, isNotEmpty } from '../../utils/utils';
import { MenuThirdLevelModel } from './models/menu-third-level.model';
import { AppIcon } from '../../enums/app-icon.enum';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../core/user-identity/services/authentication.service';
import { HomeRouting } from '../../../core/configurations/routing/children/home-routing';

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
    this.menu.push(this._tripMenu());

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

  public onClickNotLastLevel(tLevel: MatExpansionPanelHeader, menuLevel: MenuFirstLevelModel | MenuSecondLevelModel): void {
    if (isEmpty(menuLevel.nextLevels)) {
      tLevel._toggle();
      this._router.navigateByUrl(menuLevel.navigateUrl);
    }
  }

  public onClickLastLevel(tLevel: MatExpansionPanelHeader, menuLevel: MenuThirdLevelModel): void {
    tLevel._toggle();
    this._router.navigateByUrl(menuLevel.navigateUrl);
  }

  public navigateToHome(): void {
    this._router.navigateByUrl('/');
  }

  private _tripMenu(): MenuFirstLevelModel {
    const appTranslateRoute = this.translateRoute + 'MENU.TRIPS.';

    return new MenuFirstLevelModel(
      appTranslateRoute + 'MENU_NAME',
      HomeRouting.root,
      AppIcon.List,
      [],
    );
  }

  private _setActiveMenuElements(url: string): void {
    if (isEmpty(url)) {
      return;
    }

    this.menu.forEach(m => {
      m.isActive = url.contains(m.navigateUrl);

      m.nextLevels.forEach(nl => {
        nl.isActive = url.contains(nl.navigateUrl);

        nl.nextLevels.forEach(ll => {
          ll.isActive = url.contains(ll.navigateUrl);
        });
      });
    });
  }
}
