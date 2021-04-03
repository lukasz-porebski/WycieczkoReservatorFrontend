import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isNotDefined } from '../../../../../../shared/utils/utils';

export abstract class NewPasswordValidator {
  public static isDifferentThanOld(olrdPasswordControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (isNotDefined(control.value) ||
        !NewPasswordValidator._isDifferentThanOld(olrdPasswordControl.value, control.value)) {
        return { isDifferentThanOld: true };
      }
      return null;
    };
  }

  private static _isDifferentThanOld(oldPassword: string, newPassword: string): boolean {
    return oldPassword !== newPassword;
  }
}
