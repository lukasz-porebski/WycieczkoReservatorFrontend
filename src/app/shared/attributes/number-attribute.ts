import { IAttribute } from '../interfaces/attribute.interface';
import { isDefined } from '../utils/utils';
import { ErrorModel } from '../models/error.model';
import { FormControl } from '@angular/forms';

export interface INumberAttributeConfiguration {
  translateRoute: string;
  defaultValue?: number;
  min?: number;
  max?: number;
}

export class NumberAttribute implements IAttribute {
  public get value(): number {
    return isDefined(this.formControl.value) ? this.formControl.value : null;
  }

  public set value(v: number) {
    this.formControl.setValue(v);
  }

  public readonly translateRoute: string;
  public readonly error = new ErrorModel();
  public readonly defaultValue?: number;
  public readonly formControl: FormControl;
  public readonly min?: number;
  public readonly max?: number;

  constructor(configuration: INumberAttributeConfiguration) {
    this.translateRoute = configuration.translateRoute;
    this.defaultValue = configuration.defaultValue;
    this.min = configuration.min;
    this.max = configuration.min;

    this.formControl = new FormControl(this.defaultValue);
  }
}

