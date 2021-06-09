import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../core/services/http.service';
import { Observable, of } from 'rxjs';
import { UserListApiModel, UserListApiResponse } from '../models/user-list-api-model';
import { AdminServiceModule } from '../../../admin-service.module';
import { ChangeUserRoleRequestModel } from '../modals/user-role-change-modal/models/requests/change-user-role-request-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: AdminServiceModule
})
export class UsersListApiService {

  private readonly _usersUrl = `${this._http.baseUrl}/users/`;
  private readonly _adminUrl = `${this._http.baseUrl}/admin/`;

  constructor(private readonly _http: HttpService) {
  }

  public getUsers(): Observable<UserListApiModel[]> {
    return this._http.get<UserListApiResponse[]>(`${this._usersUrl}getAllUsers`).pipe(
      map(trips => trips.map(trip => new UserListApiModel(trip)))
    );
  }

  public changeRole(userId: number, request: ChangeUserRoleRequestModel): Observable<void> {
    return this._http.put(`${this._adminUrl}users/${userId}/change-role`, request);
  }

  public blockUser(userId: number): Observable<boolean> {
    return this._http.put(`${this._adminUrl}users/${userId}/lock-account`);
  }

  public unblockUser(userId: number): Observable<boolean> {
    return this._http.put(`${this._adminUrl}users/${userId}/unlock-account`);
  }

  public forcePasswordChange(userId: number): Observable<boolean> {
    return this._http.put(`${this._adminUrl}users/${userId}/enforce-changing-password`);
  }

  public cancelForcePasswordChange(userId: number): Observable<boolean> {
    return this._http.put(`${this._adminUrl}users/${userId}/cancel-changing-password`);
  }
}
