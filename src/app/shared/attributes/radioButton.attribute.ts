import { FormControl } from '@angular/forms';
import { isDefined } from '../utils/utils';
import { IAttribute } from '../interfaces/attribute.interface';
import { ErrorModel } from '../models/error.model';

export interface IRadioButtonAttributeConfiguration<TData> {
  translateRoute: string;
  options: TData[];
  defaultValue?: TData;
}

export class RadioButtonAttribute<TData> implements IAttribute {
  public get value(): TData {
    return isDefined(this.formControl.value) ? this.formControl.value : '';
  }

  public set value(v: TData) {
    this.formControl.setValue(v);
  }

  readonly error = new ErrorModel();

  public readonly translateRoute: string;
  public readonly options: TData[];
  public readonly defaultValue: TData | undefined | null;

  public readonly formControl: FormControl;

  constructor(configuration: IRadioButtonAttributeConfiguration<TData>) {
    this.translateRoute = configuration.translateRoute;
    this.options = configuration.options;
    this.defaultValue = isDefined(configuration.defaultValue) ? configuration.defaultValue : null;
    this.formControl = new FormControl(this.defaultValue);
  }
}
