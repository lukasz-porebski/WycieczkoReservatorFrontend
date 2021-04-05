import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Validator } from '../../../../../../../shared/utils/external';
import { isDefined } from '../../../../../../../shared/utils/utils';

export abstract class UrlValidator {
  public static isValidUrl(control: AbstractControl): ValidationErrors | null {
    if (isDefined(control.value) && !Validator.isURL(control.value)) {
      return { isValidUrl: true };
    }
    return null;
  }
}
