import { FormControl } from '@angular/forms';
import { isDefined } from '../utils/utils';
import { IAttribute } from '../interfaces/attribute.interface';
import { ErrorModel } from '../models/error.model';

export interface ICheckboxAttributeConfiguration {
  translateRoute: string;
  defaultValue?: boolean;
}

export class CheckboxAttribute implements IAttribute {
  public get value(): boolean {
    return isDefined(this.formControl.value) ? this.formControl.value : '';
  }

  public set value(v: boolean) {
    this.formControl.setValue(v);
  }

  readonly error = new ErrorModel();

  public readonly translateRoute: string;
  public readonly defaultValue: undefined | boolean;

  public readonly formControl: FormControl;

  constructor(configuration: ICheckboxAttributeConfiguration) {
    this.translateRoute = configuration.translateRoute;
    this.defaultValue = isDefined(configuration.defaultValue) ? configuration.defaultValue : false;
    this.formControl = new FormControl(this.defaultValue);
  }
}
