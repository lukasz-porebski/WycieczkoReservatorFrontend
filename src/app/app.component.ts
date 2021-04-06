import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import '../app/shared/extensions/string.extensions';
import '../app/shared/extensions/date.extensions';
import { environment } from '../environments/environment';
import { AuthenticationService } from './core/user-identity/services/authentication.service';
import { DevelopmentEnvironmentMode } from '../environments/development-environment-mode.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  constructor(translate: TranslateService, authenticationService: AuthenticationService) {
    translate.addLangs([ 'pl' ]);
    translate.setDefaultLang('pl');

    console.log('environment', environment);

    this._setEnvironment(environment.mode, authenticationService);
  }

  private _setEnvironment(mode: DevelopmentEnvironmentMode,
                          authenticationService: AuthenticationService): void {
    switch (mode) {
      case DevelopmentEnvironmentMode.Prod:
        if (authenticationService.token?.isFake) {
          authenticationService
            .logout()
            .subscribe();
        }
        break;
      case DevelopmentEnvironmentMode.FullAccess:
        authenticationService
          .logout()
          .subscribe();
        break;
      default:
        if (environment.autoLogIn) {
          authenticationService
            .logout()
            .subscribe();
          authenticationService
            .fakeLogIn(environment.userRole)
            .subscribe();
        }
    }
  }
}
