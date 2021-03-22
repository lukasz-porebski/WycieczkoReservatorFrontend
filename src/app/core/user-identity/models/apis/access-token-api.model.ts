export class AccessTokenApiModel {
  public accessToken: string;
  public tokenType: string;
  public expiresIn: number;
  public scope: string;
  public createdAt: Date;
  public isExpired: boolean;

  constructor(response: AccessTokenApiModel) {
    this.accessToken = response.accessToken;
    this.tokenType = response.tokenType;
    this.expiresIn = response.expiresIn;
    this.scope = response.scope;
    this.createdAt = new Date(JSON.stringify(response.createdAt));
    this.isExpired = response.isExpired;
  }
}
