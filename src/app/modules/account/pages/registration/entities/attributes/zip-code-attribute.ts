import { IAttribute } from '../../../../../../shared/interfaces/attribute.interface';
import { ErrorModel } from '../../../../../../shared/models/error.model';
import { FormControl, Validators } from '@angular/forms';

export class ZipCodeAttribute implements IAttribute {
  public get value(): string {
    return this.formControl.value;
  }

  public set value(v: string) {
    this.formControl.setValue(v);
  }

  public get error(): ErrorModel {
    this._error.setMessage(null);

    if (this.formControl.errors?.required) {
      return this._error.setMessage('SHARED.ATTRIBUTES.ERRORS.REQUIRED');
    }

    if (this.formControl.errors?.minlength || this.formControl.errors?.maxlength) {
      return this._error.setMessage(this.translateRoute + 'ERRORS.LENGTH');
    }

    return this._error;
  }

  public readonly translateRoute = 'MODULES.ACCOUNT.PAGES.REGISTRATION.ATTRIBUTES.ZIP_CODE.';
  public readonly length = 5;
  public readonly formControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(this.length),
    Validators.maxLength(this.length)
  ]);

  private readonly _error = new ErrorModel();
}
