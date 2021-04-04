import { ISelectAttributeConfiguration, SelectAttribute } from './base/select-attribute';
import { FormControl } from '@angular/forms';

export interface ISingleSelectAttributeConfiguration<TData, TValue = TData>
  extends ISelectAttributeConfiguration<TData, TValue> {
  defaultValue?: TValue;
}

export class SingleSelectAttribute<TData, TValue = TData> extends SelectAttribute<TData, TValue> {
  public get value(): TValue {
    return this.getValue() as TValue;
  }

  public set value(v: TValue) {
    this.setValue(v);
  }

  constructor(configuration: ISingleSelectAttributeConfiguration<TData, TValue>) {
    super(configuration);
    const defaultValue = configuration.defaultValue;
    this.formControl = new FormControl(defaultValue, this.validators);
  }
}


