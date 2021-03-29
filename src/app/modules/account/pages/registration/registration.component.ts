import { Component, OnInit } from '@angular/core';
import { AccountRouting } from '../../../../core/configurations/routing/account/account-routing';
import { AppInputModel } from '../../../../shared/components/wrappers/app-input/models/app-input.model';
import { AppButtonModel } from '../../../../shared/components/wrappers/app-button/models/app-button.model';
import { AppInputBasicModel } from '../../../../shared/components/wrappers/app-input/models/input-types/app-input-basic.model';
import { AppInputBasicType } from '../../../../shared/components/wrappers/app-input/enums/app-input-basic-type.enum';
import { UserApiService } from '../../services/user-api.service';
import { AppInputHintAlign } from '../../../../shared/components/wrappers/app-input/enums/app-input-hint-align.enum';
import { RegistrationEntity } from './entities/registration-entity';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [ './registration.component.scss' ]
})
export class RegistrationComponent implements OnInit {
  public readonly entity = new RegistrationEntity();
  public readonly translateRoute = 'MODULES.ACCOUNT.PAGES.REGISTRATION.';
  public readonly accountRouting = AccountRouting;

  public emailInput: AppInputModel;
  public passwordInput: AppInputModel;
  public repeatedPasswordInput: AppInputModel;
  public firstNameInput: AppInputModel;
  public lastNameInput: AppInputModel;
  public streetAndNumberInput: AppInputModel;
  public zipCodeInput: AppInputModel;
  public cityInput: AppInputModel;
  public phoneNumberInput: AppInputModel;

  public button: AppButtonModel;
  public errors: string[] = [];
  public showSpinner = false;

  constructor(private readonly _accountApiService: UserApiService) {
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

    this.button = new AppButtonModel({
      onClick: () => this.onSave(),
      label: {
        text: this.translateRoute + 'REGISTER',
      },
    });
  }

  public onSave(): void {
    this.entity.whole.disable();
    this.showSpinner = true;

    // this._accountApiService.register()
    //   .pipe(
    //     switchMap(() => this._authenticationService.login(
    //       this.service.userEntity.email.value, this.service.userEntity.password.value)),
    //     catchError((error: string[]) => {
    //       this.errors = replaceIfNotDefined(error, [])
    //         .map(e => ErrorTranslator.getErrorTranslateRoute(e));
    //       this.service.userEntity.whole.enable();
    //       this.showSpinner = false;
    //       return of(null);
    //     }),
    //   )
    //   .subscribe(() => this.goToNextStep.emit());
  }
}
