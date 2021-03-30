import { IEntity } from '../../../../../shared/interfaces/entity.interface';
import { FormGroup } from '@angular/forms';
import { PasswordAttribute } from '../../../attributes/password/password-attribute';
import { EmailAttribute } from '../../../attributes/email/email-attribute';
import { RepeatedPasswordAttribute } from '../../../attributes/password/repeated-password-attribute';
import { TextAttribute } from '../../../../../shared/attributes/text-attribute';
import { ZipCodeAttribute } from './attributes/zip-code-attribute';

export class RegistrationEntity implements IEntity {
  public readonly email: EmailAttribute;
  public readonly password: PasswordAttribute;
  public readonly repeatedPassword: RepeatedPasswordAttribute;
  public readonly firstName: TextAttribute;
  public readonly lastName: TextAttribute;
  public readonly streetAndNumber: TextAttribute;
  public readonly zipCode: ZipCodeAttribute;
  public readonly city: TextAttribute;
  public readonly phoneNumber: TextAttribute;

  public readonly whole: FormGroup;

  constructor() {
    const translateRoute = 'MODULES.USER.PAGES.REGISTRATION.ATTRIBUTES.';

    this.email = new EmailAttribute();
    this.password = new PasswordAttribute();
    this.repeatedPassword = new RepeatedPasswordAttribute(this.password);
    this.firstName = new TextAttribute(translateRoute + 'FIRST_NAME.', true);
    this.lastName = new TextAttribute(translateRoute + 'LAST_NAME.', true);
    this.city = new TextAttribute(translateRoute + 'CITY.', true);
    this.zipCode = new ZipCodeAttribute();
    this.streetAndNumber = new TextAttribute(translateRoute + 'STREET_AND_NUMBER.', true);
    this.phoneNumber = new TextAttribute(translateRoute + 'PHONE_NUMBER.', true);

    this.whole = new FormGroup({
      email: this.email.formControl,
      password: this.password.formControl,
      repeatedPassword: this.repeatedPassword.formControl,
      firstName: this.firstName.formControl,
      lastName: this.lastName.formControl,
      city: this.city.formControl,
      zipCode: this.zipCode.formControl,
      streetAndNumber: this.streetAndNumber.formControl,
      phoneNumber: this.phoneNumber.formControl,
    });
  }

  public dispose(): void {
    this.repeatedPassword.dispose();
  }
}
