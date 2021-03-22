import { isDefined } from '../utils/utils';

export class ErrorModel {
  public get isAny(): boolean {
    return isDefined(this.message);
  }

  public get message(): string {
    return this._message;
  }

  private _message = '';

  public setMessage(message: string): this {
    this._message = message;
    return this;
  }
}
