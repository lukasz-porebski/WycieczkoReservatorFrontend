import { AccessTokenApiModel } from './apis/access-token-api.model';
import { UserRole } from '../enums/user-role.enum';

interface StoredTokenModel {
  accessToken: string;
  userRole: UserRole;
}

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

  constructor(model: StoredTokenModel | AccessTokenApiModel) {
    if (model instanceof AccessTokenApiModel) {
      this.accessToken = model.token;
      this.userRole = model.role;
    } else {
      this.accessToken = model.accessToken;
      this.userRole = model.userRole;
    }
  }

  public static FromJson(json: string): TokenModel {
    const parsedJson = JSON.parse(json) as StoredTokenModel;
    const result = new TokenModel(parsedJson);
    return result;
  }
}
