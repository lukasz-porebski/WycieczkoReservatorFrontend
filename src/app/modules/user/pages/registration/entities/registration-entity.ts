import { IEntity } from '../../../../../shared/interfaces/entity.interface';
import { FormGroup } from '@angular/forms';
import { PasswordAttribute } from '../../../attributes/password/password-attribute';
import { EmailAttribute } from '../../../attributes/email/email-attribute';
import { RepeatedPasswordAttribute } from '../../../attributes/password/repeated-password-attribute';
import { TextAttribute } from '../../../../../shared/attributes/text-attribute';
import { ZipCodeAttribute } from './attributes/zip-code-attribute';
import { PasswordHelpQuestion } from '../enums/password-help-question.enum';

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
  public readonly passwordHelpQuestionAnswer: TextAttribute;

  public selectedPasswordHelpQuestion: PasswordHelpQuestion;

  public readonly whole: FormGroup;

  constructor(defaultPasswordHelpQuestion: PasswordHelpQuestion) {
    const translateRoute = 'MODULES.USER.PAGES.REGISTRATION.ATTRIBUTES.';

    this.email = new EmailAttribute();
    this.password = new PasswordAttribute();
    this.repeatedPassword = new RepeatedPasswordAttribute(this.password);
    this.firstName = new TextAttribute({
      translateRoute: translateRoute + 'FIRST_NAME.',
      isRequired: true
    });
    this.lastName = new TextAttribute({
      translateRoute: translateRoute + 'LAST_NAME.',
      isRequired: true
    });
    this.city = new TextAttribute({
      translateRoute: translateRoute + 'CITY.',
      isRequired: true
    });
    this.zipCode = new ZipCodeAttribute();
    this.streetAndNumber = new TextAttribute({
      translateRoute: translateRoute + 'STREET_AND_NUMBER.',
      isRequired: true
    });
    this.phoneNumber = new TextAttribute({
      translateRoute: translateRoute + 'PHONE_NUMBER.',
      isRequired: true
    });
    this.passwordHelpQuestionAnswer = new TextAttribute({
      translateRoute: translateRoute + 'PASSWORD_HELP_QUESTION_ANSWER.',
      isRequired: true
    });
    this.selectedPasswordHelpQuestion = defaultPasswordHelpQuestion;

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
