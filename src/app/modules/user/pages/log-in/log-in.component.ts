import { Component, OnInit } from '@angular/core';
import { LogInEntity } from './entities/log-in-entity';
import { AuthenticationService } from '../../../../core/user-identity/services/authentication.service';
import { Router } from '@angular/router';
import { AppButtonModel } from '../../../../shared/components/wrappers/app-button/models/app-button.model';
import { AppInputModel } from '../../../../shared/components/wrappers/app-input/models/app-input.model';
import { AppInputBasicModel } from '../../../../shared/components/wrappers/app-input/models/input-types/app-input-basic.model';
import { AppInputBasicType } from '../../../../shared/components/wrappers/app-input/enums/app-input-basic-type.enum';
import { UserRouting } from '../../../../core/configurations/routing/children/user-routing';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../shared/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: [ './log-in.component.scss' ]
})
export class LogInComponent implements OnInit {
  public get showSpinner(): boolean {
    return this.entity.whole.disabled;
  }

  public get disableLogInButton(): boolean {
    return this.entity.whole.invalid || this.entity.whole.disabled;
  }

  public readonly entity = new LogInEntity();
  public readonly userRouting = UserRouting;
  public readonly translateRoute = 'MODULES.USER.PAGES.LOG_IN.';

  public emailInput: AppInputModel;
  public passwordInput: AppInputModel;
  public errors: string[] = [];

  public button: AppButtonModel;

  constructor(private readonly _authenticationService: AuthenticationService,
              private readonly _router: Router,
              private readonly _errorService: ErrorService) {
  }

  public ngOnInit(): void {
    this.emailInput = new AppInputModel({
      label: {
        text: this.entity.email.translateRoute,
      },
      input: new AppInputBasicModel({
        attribute: this.entity.email,
        type: AppInputBasicType.email,
      }),
    });

    this.passwordInput = new AppInputModel({
      label: {
        text: this.entity.password.translateRoute,
      },
      input: new AppInputBasicModel({
        attribute: this.entity.password,
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
    this.entity.whole.disable();
    this._authenticationService
      .logInAndRedirectToTripsList(this.entity.email.value, this.entity.password.value)
      .subscribe(
        () => {
        },
        (error: HttpErrorResponse) => {
          this.errors = this._errorService.extractSingleMessageAsCollection(error);
          this.entity.whole.enable();
        });
  }
}
