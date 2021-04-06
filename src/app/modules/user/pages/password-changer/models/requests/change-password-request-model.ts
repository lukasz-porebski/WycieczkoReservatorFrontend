export class ChangePasswordRequestModel {
  constructor(public email: string,
              public oldPassword: string,
              public newPassword: string) {
  }
}
