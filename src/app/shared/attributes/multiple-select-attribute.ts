import { IAttribute } from '../interfaces/attribute.interface';
import { isDefined } from '../utils/utils';
import { ErrorModel } from '../models/error.model';
import { FormControl } from '@angular/forms';

export interface IMultipleSelectAttributeConfiguration<TData> {
  translateRoute: string;
  allValues: TData[];
  defaultValue?: TData[];
}

export class MultipleSelectAttribute<TData> implements IAttribute {
  public get value(): TData[] {
    return isDefined(this.formControl.value) ? this.formControl.value : null;
  }

  public set value(v: TData[]) {
    this.formControl.setValue(v);
  }

  public readonly translateRoute: string;
  public readonly error = new ErrorModel();
  public readonly allValues: TData[];
  public readonly defaultValue: TData[];
  public readonly formControl: FormControl;

  constructor(configuration: IMultipleSelectAttributeConfiguration<TData>) {
    this.translateRoute = configuration.translateRoute;
    this.allValues = [ ...configuration.allValues ];
    this.defaultValue = isDefined(configuration.defaultValue) ? [ ...configuration.defaultValue ] : [];

    this.formControl = new FormControl(this.defaultValue);
  }
}


