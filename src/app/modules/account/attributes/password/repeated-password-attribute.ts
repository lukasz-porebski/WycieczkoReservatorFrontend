import { Throw } from '../../../../shared/utils/throw';
import { FormControl, Validators } from '@angular/forms';
import { IAttribute } from '../../../../shared/interfaces/attribute.interface';
import { ErrorModel } from '../../../../shared/models/error.model';
import { IDisposable } from '../../../../shared/interfaces/disposable.interface';
import { Subscription } from 'rxjs';
import { isEmpty } from '../../../../shared/utils/utils';
import { PasswordAttribute } from './password-attribute';
import { PasswordValidator } from './password-validator';

export class RepeatedPasswordAttribute implements IAttribute, IDisposable {
  public get value(): string {
    return this.formControl.value;
  }

  public set value(v: string) {
    this.formControl.setValue(v);
  }

  public get error(): ErrorModel {
    this._error.setMessage(null);

    if (this.formControl.valid) {
      return this._error;
    }

    if (this.formControl.errors?.required) {
      return this._error.setMessage('SHARED.ATTRIBUTES.ERRORS.REQUIRED');
    }

    if (this.formControl.errors?.correctlyRepeated) {
      return this._error.setMessage(`${this.translateRoute}ERRORS.NOT_MATCH`);
    }

    return this._error;
  }

  public readonly translateRoute = 'MODULES.ACCOUNT.ATTRIBUTES.REPEATED_PASSWORD.';
  public readonly formControl: FormControl;

  private readonly _password: PasswordAttribute;
  private readonly _error = new ErrorModel();
  private readonly _subscription = new Subscription();

  constructor(password: PasswordAttribute) {
    Throw.IfNotDefined(password, 'password has to be defined');
    this._password = password;
    this._subscription.add(
      this._password.formControl.valueChanges.subscribe(() => {
        if (!isEmpty(this.value)) {
          this.formControl.updateValueAndValidity();
        }
      }));
    this.formControl = new FormControl(null, [
      Validators.required,
      PasswordValidator.correctlyRepeated(this._password.formControl)
    ]);
  }

  public dispose(): void {
    this._subscription.unsubscribe();
  }
}
