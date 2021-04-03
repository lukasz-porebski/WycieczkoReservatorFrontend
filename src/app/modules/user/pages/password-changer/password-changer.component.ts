import { Component, OnInit } from '@angular/core';
import { UserRouting } from '../../../../core/configurations/routing/children/user-routing';
import { AppInputModel } from '../../../../shared/components/wrappers/app-input/models/app-input.model';
import { AppButtonModel } from '../../../../shared/components/wrappers/app-button/models/app-button.model';
import { UserApiService } from '../../services/user-api.service';
import { AppInputBasicModel } from '../../../../shared/components/wrappers/app-input/models/input-types/app-input-basic.model';
import { AppInputBasicType } from '../../../../shared/components/wrappers/app-input/enums/app-input-basic-type.enum';
import { AppInputHintAlign } from '../../../../shared/components/wrappers/app-input/enums/app-input-hint-align.enum';
import { PasswordChangerEntity } from './entities/password-changer-entity';

@Component({
  selector: 'app-password-changer',
  templateUrl: './password-changer.component.html',
  styleUrls: [ './password-changer.component.scss' ]
})
export class PasswordChangerComponent implements OnInit {
  public get showSpinner(): boolean {
    return this.entity.whole.disabled;
  }

  public get disableButton(): boolean {
    return this.entity.whole.invalid || this.entity.whole.disabled;
  }

  public readonly entity = new PasswordChangerEntity();
  public readonly translateRoute = 'MODULES.USER.PAGES.PASSWORD_CHANGER.';
  public readonly userRouting = UserRouting;

  public emailInput: AppInputModel;
  public oldPasswordInput: AppInputModel;
  public newPasswordInput: AppInputModel;
  public repeatedNewPasswordInput: AppInputModel;

  public button: AppButtonModel;
  public errors: string[] = [];

  constructor(private readonly _userApiService: UserApiService) {
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

    this.oldPasswordInput = new AppInputModel({
      label: {
        text: this.translateRoute + 'OLD_PASSWORD',
        disableConvention: true
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.password,
        attribute: this.entity.oldPassword,
        hint: {
          hintAlign: AppInputHintAlign.end,
        },
      }),
    });

    this.newPasswordInput = new AppInputModel({
      label: {
        text: this.translateRoute + 'ATTRIBUTES.NEW_PASSWORD.',
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.password,
        attribute: this.entity.newPassword,
        hint: {
          hintAlign: AppInputHintAlign.end,
        },
      }),
    });

    this.repeatedNewPasswordInput = new AppInputModel({
      label: {
        text: this.translateRoute + 'REPEAT_NEW_PASSWORD',
        disableConvention: true
      },
      input: new AppInputBasicModel({
        type: AppInputBasicType.password,
        attribute: this.entity.repeatedNewPassword,
      }),
    });

    this.button = new AppButtonModel({
      onClick: () => this.onSave(),
      label: {
        text: this.translateRoute + 'CHANGE_PASSWORD',
      },
    });
  }

  public onSave(): void {
    this.entity.whole.disable();

    // this._userApiService.register()
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
