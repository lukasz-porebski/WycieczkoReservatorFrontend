import { IAttribute } from '../../../../../../../shared/interfaces/attribute.interface';
import { ErrorModel } from '../../../../../../../shared/models/error.model';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { UrlValidator } from './url-validator';

export interface IUrlAttributeConfiguration {
  translateRoute: string;
  required?: boolean;
  defaultValue?: string;
}

export class UrlAttribute implements IAttribute {
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

    if (this.formControl.errors?.isValidUrl) {
      return this._error.setMessage('MODULES.ADMIN.PAGES.TRIP_PERSISTER.ATTRIBUTES.URL.ERRORS.INVALID_FORMAT');
    }

    return this._error;
  }

  public readonly translateRoute;
  public readonly length = 5;
  public readonly formControl: FormControl;

  private readonly _error = new ErrorModel();
  private readonly _validators: ValidatorFn[] = [];

  constructor(configuration: IUrlAttributeConfiguration) {
    this.translateRoute = configuration.translateRoute;

    this._validators.push(UrlValidator.isValidUrl);
    if (configuration.required) {
      this._validators.push(Validators.required);
    }

    this.formControl = new FormControl(configuration.defaultValue, this._validators);
  }
}
