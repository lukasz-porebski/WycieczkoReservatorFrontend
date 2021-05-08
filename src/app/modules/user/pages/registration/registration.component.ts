import { Component, OnInit } from '@angular/core';
import { UserRouting } from '../../../../core/configurations/routing/children/user-routing';
import { AppInputModel } from '../../../../shared/components/wrappers/app-input/models/app-input.model';
import { AppButtonModel } from '../../../../shared/components/wrappers/app-button/models/app-button.model';
import { AppInputBasicModel } from '../../../../shared/components/wrappers/app-input/models/input-types/app-input-basic.model';
import { AppInputBasicType } from '../../../../shared/components/wrappers/app-input/enums/app-input-basic-type.enum';
import { UserApiService } from '../../services/user-api.service';
import { AppInputHintAlign } from '../../../../shared/components/wrappers/app-input/enums/app-input-hint-align.enum';
import { RegistrationEntity } from './entities/registration-entity';
import { PasswordHelpQuestionsFactory } from './factories/password-help-questions-factory';
import { RegistrationRequestFactory } from './factories/registration-request-factory';
import { AuthenticationService } from '../../../../core/user-identity/services/authentication.service';
import { switchMap } from 'rxjs/operators';
import { ErrorService } from '../../../../shared/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [ './registration.component.scss' ]
})
export class RegistrationComponent implements OnInit {
  public get showSpinner(): boolean {
    return this.entity.whole.disabled;
  }

  public get disableRegisterButton(): boolean {
    return this.entity.whole.invalid || this.entity.whole.disabled;
  }

  public readonly passwordHelpQuestions = this._passwordHelpQuestionsFactory.createPasswordHelpQuestions();
  public readonly entity = new RegistrationEntity(this.passwordHelpQuestions[0].value);
  public readonly translateRoute = 'MODULES.USER.PAGES.REGISTRATION.';
  public readonly userRouting = UserRouting;

  public emailInput: AppInputModel;
  public passwordInput: AppInputModel;
  public repeatedPasswordInput: AppInputModel;
  public firstNameInput: AppInputModel;
  public lastNameInput: AppInputModel;
  public streetAndNumberInput: AppInputModel;
  public zipCodeInput: AppInputModel;
  public cityInput: AppInputModel;
  public phoneNumberInput: AppInputModel;
  public passwordHelpQuestionAnswerInput: AppInputModel;

  public button: AppButtonModel;
  public errors: string[] = [];

  constructor(private readonly _userApiService: UserApiService,
              private readonly _passwordHelpQuestionsFactory: PasswordHelpQuestionsFactory,
              private readonly _requestFactory: RegistrationRequestFactory,
              private readonly _authenticationService: AuthenticationService,
              private readonly _errorService: ErrorService) {
  }

  public ngOnInit(): void {
    this.emailInput = new AppInputModel({
      label: {
        text: this.entity.email.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.email,
        attribute: this.entity.email,
      }),
    });

    this.passwordInput = new AppInputModel({
      label: {
        text: this.entity.password.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.password,
        attribute: this.entity.password,
        hint: {
          hintAlign: AppInputHintAlign.end,
        },
      }),
    });

    this.repeatedPasswordInput = new AppInputModel({
      label: {
        text: this.entity.repeatedPassword.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.password,
        attribute: this.entity.repeatedPassword,
      }),
    });

    this.firstNameInput = new AppInputModel({
      label: {
        text: this.entity.firstName.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: this.entity.firstName,
      }),
    });

    this.lastNameInput = new AppInputModel({
      label: {
        text: this.entity.lastName.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: this.entity.lastName,
      }),
    });

    this.cityInput = new AppInputModel({
      label: {
        text: this.entity.city.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: this.entity.city,
      }),
    });

    this.zipCodeInput = new AppInputModel({
      label: {
        text: this.entity.zipCode.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.zipCode,
        attribute: this.entity.zipCode,
      }),
    });

    this.streetAndNumberInput = new AppInputModel({
      label: {
        text: this.entity.streetAndNumber.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: this.entity.streetAndNumber,
      }),
    });

    this.phoneNumberInput = new AppInputModel({
      label: {
        text: this.entity.phoneNumber.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: this.entity.phoneNumber,
      }),
    });

    this.passwordHelpQuestionAnswerInput = new AppInputModel({
      label: {
        text: this.entity.passwordHelpQuestionAnswer.translateRoute,
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.text,
        attribute: this.entity.passwordHelpQuestionAnswer,
      }),
    });

    this.button = new AppButtonModel({
      onClick: () => this.onSave(),
      label: {
        text: this.translateRoute + 'REGISTER',
      },
    });
  }

  public onSave(): void {
    this.entity.whole.disable();
    const request = this._requestFactory.createRegister(this.entity);

    this._userApiService
      .register(request)
      .pipe(
        switchMap(() => this._authenticationService.logInAndRedirectToTripsList(request.email, request.password))
      )
      .subscribe(
        () => {
        },
        (error: HttpErrorResponse) => {
          this.errors = this._errorService.extractSingleMessageAsCollection(error);
          this.entity.whole.enable();
        });
  }
}
