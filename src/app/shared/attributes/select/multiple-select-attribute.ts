import { isDefined } from '../../utils/utils';
import { FormControl } from '@angular/forms';
import { ISelectAttributeConfiguration, SelectAttribute } from './base/select-attribute';

export interface IMultipleSelectAttributeConfiguration<TData, TValue = TData>
  extends ISelectAttributeConfiguration<TData, TValue> {
  defaultValue?: TValue[];
}

export class MultipleSelectAttribute<TData, TValue = TData> extends SelectAttribute<TData, TValue> {
  public get value(): TValue[] {
    return this.getValue() as TValue[];
  }

  public set value(v: TValue[]) {
    this.setValue(v);
  }

  constructor(configuration: IMultipleSelectAttributeConfiguration<TData, TValue>) {
    super(configuration);
    const defaultValue = isDefined(configuration.defaultValue) ? [ ...configuration.defaultValue ] : [];
    this.formControl = new FormControl(defaultValue, this.validators);
  }
}


