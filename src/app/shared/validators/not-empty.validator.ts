import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEmpty } from '../utils/utils';

export abstract class NotEmptyValidator {
  public static validate(control: AbstractControl): ValidationErrors | null {
    if (isEmpty(control.value)
      || NotEmptyValidator.isInvalid(control.value)) {
      return {isEmpty: true};
    }
    return null;
  }

  private static isInvalid(value: any): boolean {
    if (typeof value === 'string') {
      return isEmpty(value.trim());
    }
    return false;
  }
}
