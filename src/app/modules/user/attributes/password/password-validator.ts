import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNotDefined } from '../../../../shared/utils/utils';

export abstract class PasswordValidator {
  private static readonly _specialCharacters = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

  public static format(control: AbstractControl): ValidationErrors | null {
    if (isNotDefined(control.value) || !PasswordValidator._isFormatValid(control.value)) {
      return { format: true };
    }
    return null;
  }


  public static containsWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if (isNotDefined(control.value) || PasswordValidator._containsWhiteSpace(control.value)) {
      return { containsWhiteSpace: true };
    }
    return null;
  }

  public static properLength(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (isNotDefined(control.value) || !PasswordValidator._isLengthValid(control.value, min, max)) {
        return { length: true };
      }
      return null;
    };
  }

  public static correctlyRepeated(passwordControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (isNotDefined(control.value) || !PasswordValidator._isCorrectlyRepeated(passwordControl.value, control.value)) {
        return { correctlyRepeated: true };
      }
      return null;
    };
  }

  private static _isFormatValid(value: string): boolean {
    return value.some(char => char.isLowerCase())
      && value.some(char => char.isUpperCase())
      && value.some(char => char.isNumber())
      && value.some(char => this._specialCharacters.contains(char));
  }


  private static _isLengthValid(value: string, min: number, max: number): boolean {
    return value.length >= min && value.length <= max;
  }

  private static _containsWhiteSpace(value: string): boolean {
    return value.some(char => char.isWhiteSpace());
  }

  private static _isCorrectlyRepeated(password: string, repeatedPassword: string): boolean {
    return password === repeatedPassword;
  }
}
