import { IAttribute } from '../../../interfaces/attribute.interface';
import { isDefined } from '../../../utils/utils';
import { ErrorModel } from '../../../models/error.model';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';

export interface ISelectAttributeConfiguration<TData, TValue = TData> {
  translateRoute: string;
  dataSource: ReadonlyArray<TData>;
  required?: boolean;
  valueSelector?: (data: TData) => TValue;
  optionTextSelector?: (data: TData) => string | number | TValue;
}

export abstract class SelectAttribute<TData, TValue = TData> implements IAttribute {
  public abstract get value(): TValue[] | TValue;
  public abstract set value(v: TValue[] | TValue)

  public get error(): ErrorModel {
    this.errorModel.setMessage(null);

    if (this.formControl.errors?.required) {
      return this.errorModel.setMessage('SHARED.ATTRIBUTES.ERRORS.REQUIRED');
    }

    return this.errorModel;
  }

  public readonly translateRoute: string;
  public readonly dataSource: TData[];
  public readonly valueSelector: (TData: TData) => TValue;
  public readonly optionTextSelector: (data: TData) => string | number | TValue;

  public formControl: FormControl;

  protected readonly errorModel = new ErrorModel();
  protected readonly validators: ValidatorFn[] = [];

  protected constructor(configuration: ISelectAttributeConfiguration<TData, TValue>) {
    this.translateRoute = configuration.translateRoute;
    this.dataSource = [ ...configuration.dataSource ];
    this.valueSelector = isDefined(configuration.valueSelector)
      ? configuration.valueSelector
      : (data) => (data as unknown as TValue);
    this.optionTextSelector = isDefined(configuration.optionTextSelector)
      ? configuration.optionTextSelector
      : (data) => (data as unknown as TValue);

    if (configuration.required) {
      this.validators.push(Validators.required);
    }
  }

  protected getValue(): TValue[] | TValue {
    return isDefined(this.formControl.value) ? this.formControl.value : null;
  }

  protected setValue(v: TValue[] | TValue): void {
    this.formControl.setValue(v);
  }
}


