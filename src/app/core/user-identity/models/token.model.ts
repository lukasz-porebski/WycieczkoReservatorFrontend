import { AccessTokenApiModel } from './apis/access-token-api.model';
import { UserRole } from '../enums/user-role.enum';

export class TokenModel {
  public get isAccessTokenActive(): boolean {
    return this.expireDate > new Date();
  }

  public get isFake(): boolean {
    return this.accessToken === TokenModel.fakeAccessToken;
  }

  public static readonly fakeAccessToken = 'fake-access-token';

  public readonly accessToken: string;
  public readonly expireDate: Date;
  public readonly userRole: UserRole;

  constructor(model: AccessTokenApiModel) {
    this.accessToken = model.accessToken;
    this.expireDate = model.expireDate;
    this.userRole = model.userRole;
  }

  public static FromJson(json: string): TokenModel {
    const parsedJson = JSON.parse(json) as TokenModel;
    const result = new TokenModel(parsedJson);
    return result;
  }
}
