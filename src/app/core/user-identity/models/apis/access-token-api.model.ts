import { UserRole } from '../../enums/user-role.enum';

export interface AccessTokenApiResponse {
  token: string;
  role: string;
}

export class AccessTokenApiModel {
  public token: string;
  public role: UserRole;

  constructor(response: AccessTokenApiResponse) {
    this.token = response.token;
    this.role = this._parseRole(response.role);
  }

  private _parseRole(roleAsString: string): UserRole {
    switch (roleAsString) {
      case 'ROLE_USER':
        return UserRole.User;
      case 'ROLE_GUIDE':
        return UserRole.Guide;
      case 'ROLE_ADMIN':
        return UserRole.Admin;
      default:
        console.error('Unknown user role:', roleAsString);
        return -1;
    }
  }
}
