import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserRole } from '../enums/user-role.enum';
import { ValueTextPairModel } from '../../../shared/models/value-text-pair-model';

@Injectable({
  providedIn: 'root'
})
export class UserRoleFactory {
  constructor(private readonly _translateService: TranslateService) {
  }

  public createUserRoles(): ReadonlyArray<ValueTextPairModel<UserRole>> {
    const translateRoute = 'CORE.USER_IDENTITY.ENUMS.USER_ROLE.';
    const questions: ValueTextPairModel<UserRole>[] = [];

    questions.push(new ValueTextPairModel<UserRole>(
      UserRole.User, this._translateService.instant(translateRoute + 'USER')));

    questions.push(new ValueTextPairModel<UserRole>(
      UserRole.Guide, this._translateService.instant(translateRoute + 'GUIDE')));

    questions.push(new ValueTextPairModel<UserRole>(
      UserRole.Admin, this._translateService.instant(translateRoute + 'ADMIN')));

    return questions;
  }
}
