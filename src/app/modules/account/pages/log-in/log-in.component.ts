import { Component, OnInit } from '@angular/core';
import { LogInEntity } from './entities/log-in-entity';
import { AuthenticationService } from '../../../../core/user-identity/services/authentication.service';
import { Router } from '@angular/router';
import { AppButtonModel } from '../../../../shared/components/wrappers/app-button/models/app-button.model';
import { AppInputModel } from '../../../../shared/components/wrappers/app-input/models/app-input.model';
import { AppInputBasicModel } from '../../../../shared/components/wrappers/app-input/models/input-types/app-input-basic.model';
import { replaceIfNotDefined } from '../../../../shared/utils/utils';
import { ErrorTranslator } from '../../../../shared/utils/error-translator';
import { AppInputBasicType } from '../../../../shared/components/wrappers/app-input/enums/app-input-basic-type.enum';
import { AppRouting } from '../../../../core/configurations/routing/app-routing';
import { AccountRouting } from '../../../../core/configurations/routing/account/account-routing';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  public get showSpinner(): boolean {
    return this.userLogInEntity.whole.disabled;
  }

  public get disableLogInButton(): boolean {
    return this.userLogInEntity.whole.invalid || this.userLogInEntity.whole.disabled;
  }

  public readonly userLogInEntity = new LogInEntity();
  public readonly accountRouting = AccountRouting;
  public readonly translateRoute = 'MODULES.ACCOUNT.PAGES.LOG_IN.';

  public emailInput: AppInputModel;
  public passwordInput: AppInputModel;
  public errors: string[] = [];

  public button: AppButtonModel;

  constructor(private readonly _authenticationService: AuthenticationService,
              private readonly _router: Router) {
  }

  public ngOnInit(): void {
    this.emailInput = new AppInputModel({
      label: {
        text: this.userLogInEntity.email.translateRoute,
      },
      input: new AppInputBasicModel({
        attribute: this.userLogInEntity.email,
        type: AppInputBasicType.email,
      }),
    });

    this.passwordInput = new AppInputModel({
      label: {
        text: this.userLogInEntity.password.translateRoute,
      },
      input: new AppInputBasicModel({
        attribute: this.userLogInEntity.password,
        type: AppInputBasicType.password,
        passwordShowButton: true,
      }),
    });

    this.button = new AppButtonModel({
      onClick: () => this.onLogIn(),
      label: {
        text: this.translateRoute + 'LOG_IN_BUTTON',
      },
    });
  }

  public onLogIn(): void {
    this.userLogInEntity.whole.disable();
    this._authenticationService
      .logIn(this.userLogInEntity.email.value, this.userLogInEntity.password.value)
      .subscribe(
        () => this._router.navigate([AppRouting.home.root]),
        (error: string[]) => {
          this.errors = replaceIfNotDefined(error, [])
            .map(e => ErrorTranslator.getErrorTranslateRoute(e));
          this.userLogInEntity.whole.enable();
        });
  }
}
