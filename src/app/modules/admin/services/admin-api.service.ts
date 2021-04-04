import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable, of } from 'rxjs';
import { UserListModel } from '../pages/users-list/models/user-list-model';
import { UserRole } from '../../../core/user-identity/enums/user-role.enum';
import { AdminServiceModule } from '../admin-service.module';
import { ChangeUserRoleRequestModel } from '../pages/users-list/modals/user-role-change-modal/models/requests/change-user-role-request-model';

@Injectable({
  providedIn: AdminServiceModule
})
export class AdminApiService {

  private readonly _baseUrl = `${this._http.baseUrl}/admin/`;

  constructor(private readonly _http: HttpService) {
  }

  public getUsers(): Observable<UserListModel[]> {
    const users: UserListModel[] = [];

    users.push({
      id: 1,
      email: 'test1@email.com',
      firstName: 'Adam',
      lastName: 'Małysz',
      role: UserRole.User,
      isBlocked: true,
      isForcedPasswordChange: true
    });

    users.push({
      id: 2,
      email: 'test2@email.com',
      firstName: 'Ewa',
      lastName: 'Ewart',
      role: UserRole.Guide,
      isBlocked: false,
      isForcedPasswordChange: false
    });

    users.push({
      id: 3,
      email: 'test3@email.com',
      firstName: 'Krystyna',
      lastName: 'Zbieg',
      role: UserRole.Admin,
      isBlocked: false,
      isForcedPasswordChange: true
    });

    return of(users);
  }

  public changeRole(request: ChangeUserRoleRequestModel): Observable<boolean> {
    return of(true);
  }

  public blockUser(userId: number): Observable<boolean> {
    return of(true);
  }

  public unblockUser(userId: number): Observable<boolean> {
    return of(true);
  }

  public forcePasswordChange(userId: number): Observable<boolean> {
    return of(true);
  }

  public undoForcePasswordChange(userId: number): Observable<boolean> {
    return of(true);
  }
}
