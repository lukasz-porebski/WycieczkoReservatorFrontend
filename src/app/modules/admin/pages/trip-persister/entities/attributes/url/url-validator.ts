import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isNotDefined } from '../../../../../../../shared/utils/utils';
import { Validator } from '../../../../../../../shared/utils/external';

export abstract class UrlValidator {
  public static isUrl(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (isNotDefined(control.value) || !Validator.isURL(control.value)) {
        return { isUrl: true };
      }
      return null;
    };
  }
}
