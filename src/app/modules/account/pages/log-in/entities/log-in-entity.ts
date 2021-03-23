import { IEntity } from '../../../../../shared/interfaces/entity.interface';
import { FormGroup } from '@angular/forms';
import { PasswordAttribute } from '../../../attributes/password/password-attribute';
import { EmailAttribute } from '../../../attributes/email/email-attribute';

export class LogInEntity implements IEntity {
  public readonly email: EmailAttribute;
  public readonly password: PasswordAttribute;

  public readonly whole: FormGroup;

  constructor() {
    this.email = new EmailAttribute();
    this.password = new PasswordAttribute();

    this.whole = new FormGroup({
      email: this.email.formControl,
      password: this.password.formControl
    });
  }
}
