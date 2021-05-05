import { IAttribute } from '../../../../shared/interfaces/attribute.interface';
import { AbstractControlOptions, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { ErrorModel } from '../../../../shared/models/error.model';
import { PasswordValidator } from './password-validator';
import { replaceIfNotDefined } from '../../../../shared/utils/utils';

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

  public readonly translateRoute = 'MODULES.USER.ATTRIBUTES.PASSWORD.';
  public readonly minLength = 6;
  public readonly formControl: FormControl;

  protected readonly _error = new ErrorModel();

  constructor(additionalValidators?: ValidatorFn[]) {
    this.formControl = new FormControl(null, [
      Validators.required,
      // PasswordValidator.format, //TODO: Dodać potem
      PasswordValidator.containsWhiteSpace,
      PasswordValidator.properLength(this.minLength),
      ...replaceIfNotDefined(additionalValidators, [])
    ]);
  }
}
