import { PasswordAttribute } from '../../../../attributes/password/password-attribute';
import { ErrorModel } from '../../../../../../shared/models/error.model';
import { Throw } from '../../../../../../shared/utils/throw';
import { isEmpty } from '../../../../../../shared/utils/utils';
import { IDisposable } from '../../../../../../shared/interfaces/disposable.interface';
import { Subscription } from 'rxjs';
import { NewPasswordValidator } from './new-password-validator';

export class NewPasswordAttribute extends PasswordAttribute implements IDisposable {
  public get error(): ErrorModel {
    const error = super.error;

    if (this.formControl.valid || error.isAny) {
      return error;
    }

    if (this.formControl.errors?.isDifferentThanOld) {
      return this._error.setMessage(this._thisAttributeTranslateRoute + 'ERRORS.NEW_PASSWORD_IS_SAME_AS_OLD');
    }

    return this._error;
  }

  private readonly _oldPassword: PasswordAttribute;
  private readonly _subscription = new Subscription();
  private readonly _thisAttributeTranslateRoute = 'MODULES.USER.PAGES.PASSWORD_CHANGER.ATTRIBUTES.NEW_PASSWORD.';

  constructor(oldPassword: PasswordAttribute) {
    super([ NewPasswordValidator.isDifferentThanOld(oldPassword.formControl) ]);

    Throw.IfNotDefined(oldPassword, 'old password has to be defined');

    this._oldPassword = oldPassword;
    this._subscription.add(
      this._oldPassword.formControl.valueChanges.subscribe(() => {
        if (!isEmpty(this.value)) {
          this.formControl.updateValueAndValidity();
        }
      }));
  }

  public dispose(): void {
    this._subscription.unsubscribe();
  }
}
