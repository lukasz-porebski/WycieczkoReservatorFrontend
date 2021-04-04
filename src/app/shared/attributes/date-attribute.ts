import { IAttribute } from '../interfaces/attribute.interface';
import { isDefined } from '../utils/utils';
import { ErrorModel } from '../models/error.model';
import { FormControl } from '@angular/forms';

export interface IDateAttributeConfiguration {
  defaultValue?: Date;
  min?: Date;
  max?: Date;
}

export class DateAttribute implements IAttribute {
  public get value(): Date {
    return isDefined(this.formControl.value) ? this.formControl.value : null;
  }

  public set value(v: Date) {
    this.formControl.setValue(v);
  }

  public readonly error = new ErrorModel();
  public readonly defaultValue?: Date;
  public readonly formControl: FormControl;
  public readonly min?: Date;
  public readonly max?: Date;

  constructor(configuration?: IDateAttributeConfiguration) {
    if (isDefined(configuration)) {
      this.defaultValue = configuration.defaultValue;
      this.min = configuration.min;
      this.max = configuration.min;
    }
    this.formControl = new FormControl(this.defaultValue);
  }
}
