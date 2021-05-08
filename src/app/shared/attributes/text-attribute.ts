import { IAttribute } from '../interfaces/attribute.interface';
import { ErrorModel } from '../models/error.model';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { isDefined } from '../utils/utils';

export interface ITextAttributeConfiguration {
  translateRoute: string;
  defaultValue?: string;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
}

export class TextAttribute implements IAttribute {
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

    if (isDefined(this._configuration.minLength) && isDefined(this._configuration.maxLength)) {
      if (this.formControl.errors?.minlength || this.formControl.errors?.maxlength) {
        return this._error.setMessage('SHARED.ATTRIBUTES.ERRORS.LENGTH',
          {
            minLength: this._configuration.minLength,
            maxLength: this._configuration.maxLength
          });
      }
    } else {
      if (this.formControl.errors?.minlength) {
        return this._error.setMessage('SHARED.ATTRIBUTES.ERRORS.MIN_LENGTH',
          {
            minLength: this._configuration.minLength
          });
      }

      if (this.formControl.errors?.maxlength) {
        return this._error.setMessage('SHARED.ATTRIBUTES.ERRORS.MAX_LENGTH',
          {
            maxLength: this._configuration.maxLength
          });
      }
    }

    return this._error;
  }

  public readonly translateRoute: string;
  public readonly formControl: FormControl;

  private readonly _error = new ErrorModel();

  public constructor(private readonly _configuration: ITextAttributeConfiguration) {
    this.translateRoute = _configuration.translateRoute;
    const validators: ValidatorFn[] = [];

    if (_configuration.isRequired) {
      validators.push(Validators.required);
    }

    if (_configuration.minLength) {
      validators.push(Validators.minLength(_configuration.minLength));
    }

    if (_configuration.maxLength) {
      validators.push(Validators.maxLength(_configuration.maxLength));
    }

    this.formControl = new FormControl(_configuration.defaultValue, validators);
  }
}

