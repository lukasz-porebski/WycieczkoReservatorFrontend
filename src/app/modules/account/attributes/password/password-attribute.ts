import { IAttribute } from '../../../../shared/interfaces/attribute.interface';
import { FormControl, Validators } from '@angular/forms';
import { ErrorModel } from '../../../../shared/models/error.model';
import { PasswordValidator } from './password-validator';

export class PasswordAttribute implements IAttribute {
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

    if (this.formControl.errors?.format) {
      return this._error.setMessage(`${this.translateRoute}ERRORS.INCORRECT_FORMAT`);
    }

    if (this.formControl.errors?.containsWhiteSpace) {
      return this._error.setMessage(`${this.translateRoute}ERRORS.WHITE_SPACE`);
    }

    if (this.formControl.errors?.length) {
      return this._error.setMessage(`${this.translateRoute}ERRORS.LENGTH`);
    }

    return this._error;
  }

  public readonly translateRoute = 'MODULES.ACCOUNT.ATTRIBUTES.PASSWORD.';
  public readonly minLength = 10;
  public readonly maxLength = 30;
  public readonly formControl: FormControl = new FormControl(null, [
    Validators.required,
    PasswordValidator.format,
    PasswordValidator.containsWhiteSpace,
    PasswordValidator.properLength(this.minLength, this.maxLength)
  ]);

  private readonly _error = new ErrorModel();
}
