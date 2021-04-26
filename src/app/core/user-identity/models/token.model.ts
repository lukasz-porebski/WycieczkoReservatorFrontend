import { AccessTokenApiModel } from './apis/access-token-api.model';
import { UserRole } from '../enums/user-role.enum';

export class TokenModel {
  public get isAccessTokenActive(): boolean {
    return true; // TODO: może usunąc w przyszłości
  }

  public get isFake(): boolean {
    return this.accessToken === TokenModel.fakeAccessToken;
  }

  public static readonly fakeAccessToken = 'fake-access-token';

  public readonly accessToken: string;
  public readonly userRole: UserRole;

  constructor(model: TokenModel | AccessTokenApiModel) {
    if (model instanceof TokenModel) {
      this.accessToken = model.accessToken;
      this.userRole = model.userRole;
    } else {
      this.accessToken = model.token;
      this.userRole = model.role;
    }
  }

  public static FromJson(json: string): TokenModel {
    const parsedJson = JSON.parse(json) as TokenModel;
    const result = new TokenModel(parsedJson);
    return result;
  }
}
