export class RemindPasswordRequestModel {
  constructor(public readonly email: string,
              public readonly answer: string) {
  }
}
