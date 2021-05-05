import { IAttribute } from '../../../../../../../shared/interfaces/attribute.interface';
import { ErrorModel } from '../../../../../../../shared/models/error.model';
import { FormControl } from '@angular/forms';
import { MealPricePerPersonValidator } from './meal-price-per-person-validator';
import { CheckboxAttribute } from '../../../../../../../shared/attributes/checkbox-attribute';
import { IDisposable } from '../../../../../../../shared/interfaces/disposable.interface';
import { Subscription } from 'rxjs';

export interface IMealPricePerPersonAttributeConfiguration {
  meal: CheckboxAttribute;
  defaultValue?: number;
}

export class MealPricePerPersonAttribute implements IAttribute, IDisposable {
  public get value(): number {
    return this.formControl.value;
  }

  public set value(v: number) {
    this.formControl.setValue(v);
  }

  public get error(): ErrorModel {
    this._error.setMessage(null);

    if (this.formControl.errors?.requiredPrice) {
      return this._error.setMessage('SHARED.ATTRIBUTES.ERRORS.REQUIRED');
    }

    if (this.formControl.errors?.greaterOrEqualToMinPrice) {
      return this._error.setMessage('SHARED.ATTRIBUTES.ERRORS.MIN',
        {
          minValue: this._minPrice
        });
    }

    return this._error;
  }

  public readonly translateRoute = 'MODULES.ADMIN.PAGES.TRIP_PERSISTER.ATTRIBUTES.MEAL_PRICE_PER_PERSON.';
  public readonly formControl: FormControl;

  private readonly _error = new ErrorModel();
  private readonly _subscription = new Subscription();
  private readonly _minPrice = 1;
  private readonly _meal: CheckboxAttribute;

  constructor(configuration: IMealPricePerPersonAttributeConfiguration) {
    this._meal = configuration.meal;
    const sub = this._meal.formControl.valueChanges.subscribe((isMeal: boolean) => {
      if (!isMeal) {
        this.value = 0;
      }
      this.formControl.updateValueAndValidity();
    });

    this._subscription.add(sub);

    this.formControl = new FormControl(configuration.defaultValue, [
      MealPricePerPersonValidator.requiredPrice(this._meal.formControl),
      MealPricePerPersonValidator.greaterOrEqualToMinPrice(this._meal.formControl, this._minPrice)
    ]);
  }

  public dispose(): void {
    this._subscription.unsubscribe();
  }
}

