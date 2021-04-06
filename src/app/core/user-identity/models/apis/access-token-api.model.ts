import { UserRole } from '../../enums/user-role.enum';

export class AccessTokenApiModel {
  public accessToken: string;
  public expireDate: Date;
  public userRole: UserRole;

  constructor(response: AccessTokenApiModel) {
    this.accessToken = response.accessToken;
    this.expireDate = new Date(response.expireDate.toISOString());
    this.userRole = response.userRole;
  }
}
