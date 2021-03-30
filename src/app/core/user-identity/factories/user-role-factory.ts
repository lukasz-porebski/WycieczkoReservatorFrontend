import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserRoleModel } from '../models/user-role-model';
import { UserRole } from '../enums/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserRoleFactory {
  constructor(private readonly _translateService: TranslateService) {
  }

  public createUserRoles(): ReadonlyArray<UserRoleModel> {
    const translateRoute = 'CORE.USER_IDENTITY.ENUMS.USER_ROLE.';
    const questions: UserRoleModel[] = [];

    questions.push(new UserRoleModel(
      UserRole.User, this._translateService.instant(translateRoute + 'USER')));

    questions.push(new UserRoleModel(
      UserRole.Guide, this._translateService.instant(translateRoute + 'GUIDE')));

    questions.push(new UserRoleModel(
      UserRole.Admin, this._translateService.instant(translateRoute + 'ADMIN')));

    return questions;
  }
}
