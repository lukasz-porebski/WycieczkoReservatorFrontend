import { IAttribute } from '../interfaces/attribute.interface';
import { ErrorModel } from '../models/error.model';
import { FormControl, Validators } from '@angular/forms';

export interface ITextAttributeConfiguration {
  translateRoute: string;
  isRequired?: boolean;
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

    return this._error;
  }

  public readonly translateRoute: string;
  public readonly formControl: FormControl;

  private readonly _error = new ErrorModel();

  public constructor(configuration: ITextAttributeConfiguration) {
    this.translateRoute = configuration.translateRoute;
    const validators = configuration.isRequired ? [ Validators.required ] : [];
    this.formControl = new FormControl(null, validators);
  }
}

