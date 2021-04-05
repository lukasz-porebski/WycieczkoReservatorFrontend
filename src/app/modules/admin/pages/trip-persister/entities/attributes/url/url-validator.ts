import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isNotDefined } from '../../../../../../../shared/utils/utils';
import { Validator } from '../../../../../../../shared/utils/external';

export abstract class UrlValidator {
  public static isValidUrl(control: AbstractControl): ValidationErrors | null {
    if (isNotDefined(control.value) || !Validator.isURL(control.value)) {
      return { isValidUrl: true };
    }
    return null;
  }
}
