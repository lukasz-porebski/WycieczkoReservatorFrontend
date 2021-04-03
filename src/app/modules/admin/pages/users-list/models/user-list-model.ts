import { UserRole } from '../../../../../core/user-identity/enums/user-role.enum';
import { isDefined } from '../../../../../shared/utils/utils';

export class UserListModel {
  public readonly id: number;
  public readonly email: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly role: UserRole;
  public readonly isBlocked: boolean;
  public readonly isForcedPasswordChange: boolean;

  constructor(response: UserListModel) {
    if (isDefined(response)) {
      this.id = response.id;
      this.email = response.email;
      this.firstName = response.firstName;
      this.lastName = response.lastName;
      this.role = response.role;
      this.isBlocked = response.isBlocked;
      this.isForcedPasswordChange = response.isForcedPasswordChange;
    }
  }
}
