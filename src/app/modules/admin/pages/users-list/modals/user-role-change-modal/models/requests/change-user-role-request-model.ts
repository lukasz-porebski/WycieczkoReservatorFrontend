import { UserRole } from '../../../../../../../../core/user-identity/enums/user-role.enum';
import { EnumTransformer } from '../../../../../../../../shared/utils/enum-transformer';

export class ChangeUserRoleRequestModel {
  public newRole: string;

  constructor(newRole: UserRole) {
    this.newRole = EnumTransformer.ToApiRequestUserRole(newRole);
  }
}
