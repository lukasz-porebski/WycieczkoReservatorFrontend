import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isDefined, isNotDefined } from '../../../../../../../shared/utils/utils';

export abstract class PricePerSingleDayOfMealsValidator {
  public static requiredPrice(meal: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (isNotDefined(control.value) ||
        !PricePerSingleDayOfMealsValidator._isDefined(meal.value, control.value)) {
        return { requiredPrice: true };
      }
      return null;
    };
  }

  public static greaterOrEqualToMinPrice(meal: AbstractControl, minPrice: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (isNotDefined(control.value) ||
        !PricePerSingleDayOfMealsValidator._isGreaterOrEqualToMinPrice(meal.value, control.value, minPrice)) {
        return { greaterOrEqualToMinPrice: true };
      }
      return null;
    };
  }

  private static _isDefined(isMeal: boolean, price: number): boolean {
    return isMeal ? isDefined(price) : true;
  }

  private static _isGreaterOrEqualToMinPrice(isMeal: boolean,
                                             price: number,
                                             minPrice: number): boolean {
    return isMeal ? isDefined(price) && price >= minPrice : true;
  }
}
