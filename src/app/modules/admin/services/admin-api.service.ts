import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable, of } from 'rxjs';
import { UserListModel } from '../pages/users-list/models/user-list-model';
import { UserRole } from '../../../core/user-identity/enums/user-role.enum';
import { AdminApiServiceModule } from '../admin-api-service.module';
import { ChangeUserRoleRequestModel } from '../pages/users-list/components/user-role-change/models/requests/change-user-role-request-model';

@Injectable({
  providedIn: AdminApiServiceModule
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
      role: UserRole.User
    });

    users.push({
      id: 2,
      email: 'test2@email.com',
      firstName: 'Ewa',
      lastName: 'Ewart',
      role: UserRole.Guide
    });

    users.push({
      id: 3,
      email: 'test3@email.com',
      firstName: 'Krystyna',
      lastName: 'Zbieg',
      role: UserRole.Admin
    });

    return of(users);
  }

  public changeRole(request: ChangeUserRoleRequestModel): Observable<boolean> {
    return of(true);
  }
}
