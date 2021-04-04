import { IAttribute } from '../interfaces/attribute.interface';
import { isDefined } from '../utils/utils';
import { ErrorModel } from '../models/error.model';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';

export interface IDateAttributeConfiguration {
  defaultValue?: Date;
  min?: Date;
  max?: Date;
  isRequired?: boolean;
}

export class DateAttribute implements IAttribute {
  public get value(): Date {
    return isDefined(this.formControl.value) ? this.formControl.value : null;
  }

  public set value(v: Date) {
    this.formControl.setValue(v);
  }

  public get error(): ErrorModel {
    this._error.setMessage(null);

    if (this.formControl.errors?.required) {
      return this._error.setMessage('SHARED.ATTRIBUTES.ERRORS.REQUIRED');
    }

    return this._error;
  }

  public readonly defaultValue?: Date;
  public readonly formControl: FormControl;
  public readonly min?: Date;
  public readonly max?: Date;
  public readonly isRequired: boolean;

  private readonly _error = new ErrorModel();
  private readonly _validators: ValidatorFn[] = [];

  constructor(configuration?: IDateAttributeConfiguration) {
    if (isDefined(configuration)) {
      this.defaultValue = configuration.defaultValue;
      this.min = configuration.min;
      this.max = configuration.min;
      this.isRequired = isDefined(configuration.isRequired) ? configuration.isRequired : false;
    }

    if (this.isRequired) {
      this._validators.push(Validators.required);
    }

    this.formControl = new FormControl(this.defaultValue, this._validators);
  }
}
