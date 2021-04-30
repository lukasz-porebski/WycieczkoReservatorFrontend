import { UserRole } from '../../../../../core/user-identity/enums/user-role.enum';
import { EnumTransformer } from '../../../../../shared/utils/enum-transformer';

export interface UserListApiResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserListRoleApiResponse;
  blocked: boolean;
  forcePasswordChange: boolean;
}

export interface UserListRoleApiResponse {
  id: number;
  name: string;
  description: string;
}

export class UserListApiModel {
  public readonly id: number;
  public readonly email: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly role: UserRole;
  public readonly isBlocked: boolean;
  public readonly isForcedPasswordChange: boolean;

  constructor(response: UserListApiResponse) {
    this.id = response.id;
    this.email = response.email;
    this.firstName = response.firstName;
    this.lastName = response.lastName;
    this.role = EnumTransformer.ToUserRole(response.role.name);
    this.isBlocked = response.blocked;
    this.isForcedPasswordChange = response.forcePasswordChange;
  }
}
