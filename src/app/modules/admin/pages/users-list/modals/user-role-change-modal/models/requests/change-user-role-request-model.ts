import { UserRole } from '../../../../../../../../core/user-identity/enums/user-role.enum';

export class ChangeUserRoleRequestModel {
  constructor(public readonly userId: number,
              public readonly newRole: UserRole) {
  }
}
