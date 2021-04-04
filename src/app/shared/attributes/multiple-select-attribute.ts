import { isDefined } from '../utils/utils';
import { FormControl } from '@angular/forms';
import { ISelectAttributeConfiguration, SelectAttribute } from './base/select-attribute';

export interface IMultipleSelectAttributeConfiguration<TData> extends ISelectAttributeConfiguration<TData> {
  defaultValue?: TData[];
}

export class MultipleSelectAttribute<TData> extends SelectAttribute<TData> {
  public get value(): TData[] {
    return this.getValue() as TData[];
  }

  public set value(v: TData[]) {
    this.setValue(v);
  }

  constructor(configuration: IMultipleSelectAttributeConfiguration<TData>) {
    super(configuration);
    const defaultValue = isDefined(configuration.defaultValue) ? [ ...configuration.defaultValue ] : [];
    this.formControl = new FormControl(defaultValue, this.validators);
  }
}


