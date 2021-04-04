import { IAttribute } from '../interfaces/attribute.interface';
import { isDefined } from '../utils/utils';
import { ErrorModel } from '../models/error.model';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';

export interface INumberAttributeConfiguration {
  translateRoute: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  required?: boolean;
}

export class NumberAttribute implements IAttribute {
  public get value(): number {
    return isDefined(this.formControl.value) ? this.formControl.value : null;
  }

  public set value(v: number) {
    this.formControl.setValue(v);
  }

  public get error(): ErrorModel {
    this._error.setMessage(null);

    if (this.formControl.errors?.required) {
      return this._error.setMessage('SHARED.ATTRIBUTES.ERRORS.REQUIRED');
    }

    if (this.formControl.errors?.min) {
      return this._error.setMessage('SHARED.ATTRIBUTES.ERRORS.MIN',
        {
          minValue: this.min
        });
    }

    if (this.formControl.errors?.max) {
      return this._error.setMessage('SHARED.ATTRIBUTES.ERRORS.MAX', {
        maxValue: this.max
      });
    }

    return this._error;
  }

  public readonly translateRoute: string;
  public readonly defaultValue?: number;
  public readonly formControl: FormControl;
  public readonly min?: number;
  public readonly max?: number;

  private readonly _error = new ErrorModel();
  private readonly _validators: ValidatorFn[] = [];

  constructor(configuration: INumberAttributeConfiguration) {
    this.translateRoute = configuration.translateRoute;
    this.defaultValue = configuration.defaultValue;
    this.min = configuration.min;
    this.max = configuration.min;

    if (configuration.min) {
      this._validators.push(Validators.min(configuration.min));
    }

    if (configuration.max) {
      this._validators.push(Validators.max(configuration.max));
    }

    if (configuration.required) {
      this._validators.push(Validators.required);
    }

    this.formControl = new FormControl(this.defaultValue, this._validators);
  }
}

