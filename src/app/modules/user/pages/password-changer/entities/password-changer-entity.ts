import { IEntity } from '../../../../../shared/interfaces/entity.interface';
import { FormGroup } from '@angular/forms';
import { PasswordAttribute } from '../../../attributes/password/password-attribute';
import { EmailAttribute } from '../../../attributes/email/email-attribute';
import { RepeatedPasswordAttribute } from '../../../attributes/password/repeated-password-attribute';
import { NewPasswordAttribute } from './attributes/new-password-attribute';

export class PasswordChangerEntity implements IEntity {
  public readonly email: EmailAttribute;
  public readonly oldPassword: PasswordAttribute;
  public readonly newPassword: NewPasswordAttribute;
  public readonly repeatedNewPassword: RepeatedPasswordAttribute;

  public readonly whole: FormGroup;

  constructor() {
    this.email = new EmailAttribute();
    this.oldPassword = new PasswordAttribute();
    this.newPassword = new NewPasswordAttribute(this.oldPassword);
    this.repeatedNewPassword = new RepeatedPasswordAttribute(this.newPassword);

    this.whole = new FormGroup({
      email: this.email.formControl,
      oldPassword: this.oldPassword.formControl,
      newPassword: this.newPassword.formControl,
      repeatedNewPassword: this.repeatedNewPassword.formControl,
    });
  }

  public dispose(): void {
    this.newPassword.dispose();
    this.repeatedNewPassword.dispose();
  }
}
