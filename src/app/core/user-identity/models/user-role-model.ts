import { UserRole } from '../enums/user-role.enum';

export class UserRoleModel {
  constructor(public value: UserRole,
              public text: string) {
  }
}
