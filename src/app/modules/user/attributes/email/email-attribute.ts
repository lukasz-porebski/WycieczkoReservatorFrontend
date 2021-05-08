import { FormControl, Validators } from '@angular/forms';
import { ErrorModel } from '../../../../shared/models/error.model';
import { IAttribute } from '../../../../shared/interfaces/attribute.interface';

export class EmailAttribute implements IAttribute {
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

    if (this.formControl.errors?.email) {
      return this._error.setMessage(`${this.translateRoute}ERRORS.INCORRECT_FORMAT`);
    }

    if (this.formControl.errors?.maxlength) {
      return this._error.setMessage(`${this.translateRoute}ERRORS.TO_LONG`);
    }

    return this._error;
  }

  public readonly translateRoute = 'SHARED.ATTRIBUTES.EMAIL.';
  public readonly formControl = new FormControl(null, [
    Validators.required,
    Validators.email,
    Validators.maxLength(45)
  ]);

  private readonly _error = new ErrorModel();
}
