import { UserRole } from '../../enums/user-role.enum';
import { EnumTransformer } from '../../../../shared/utils/enum-transformer';

export interface AccessTokenApiResponse {
  token: string;
  role: string;
}

export class AccessTokenApiModel {
  public token: string;
  public role: UserRole;

  constructor(response: AccessTokenApiResponse) {
    this.token = response.token;
    this.role = EnumTransformer.ToUserRole(response.role);
  }
}
