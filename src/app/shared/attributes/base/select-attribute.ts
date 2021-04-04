import { IAttribute } from '../../interfaces/attribute.interface';
import { isDefined } from '../../utils/utils';
import { ErrorModel } from '../../models/error.model';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';

export interface ISelectAttributeConfiguration<TData> {
  translateRoute: string;
  allValues: TData[];
  required?: boolean;
}

export abstract class SelectAttribute<TData> implements IAttribute {
  public abstract get value(): TData[] | TData;
  public abstract set value(v: TData[] | TData)

  public get error(): ErrorModel {
    this.errorModel.setMessage(null);

    if (this.formControl.errors?.required) {
      return this.errorModel.setMessage('SHARED.ATTRIBUTES.ERRORS.REQUIRED');
    }

    return this.errorModel;
  }

  public readonly translateRoute: string;
  public readonly allValues: TData[];
  public formControl: FormControl;

  protected readonly errorModel = new ErrorModel();
  protected readonly validators: ValidatorFn[] = [];

  protected constructor(configuration: ISelectAttributeConfiguration<TData>) {
    this.translateRoute = configuration.translateRoute;
    this.allValues = [ ...configuration.allValues ];

    if (configuration.required) {
      this.validators.push(Validators.required);
    }
  }

  protected getValue(): TData[] | TData {
    return isDefined(this.formControl.value) ? this.formControl.value : null;
  }

  protected setValue(v: TData[] | TData): void {
    this.formControl.setValue(v);
  }
}


