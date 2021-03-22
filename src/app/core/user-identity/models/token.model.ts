export class TokenModel {
  public get isAccessTokenActive(): boolean {
    return this.expireDate > new Date();
  }

  public get expireDate(): Date {
    return this._expireDate;
  }

  public readonly accessToken: string;

  private _expireDate: Date;

  constructor(accessToken: string, expiresInSeconds: number) {
    this.accessToken = accessToken;
    const now = new Date();
    now.setSeconds(now.getSeconds() + expiresInSeconds);
    this._expireDate = now;
  }

  public static FromJson(json: string): TokenModel {
    const parsedJson = JSON.parse(json) as TokenModel;
    const result = new TokenModel(parsedJson.accessToken, 1);
    result._expireDate = new Date(parsedJson._expireDate);
    return result;
  }
}
