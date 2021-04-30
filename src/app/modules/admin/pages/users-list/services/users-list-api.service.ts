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

  private readonly _baseUrl = `${this._http.baseUrl}/users/`;

  constructor(private readonly _http: HttpService) {
  }

  public getUsers(): Observable<UserListApiModel[]> {
    return this._http.get<UserListApiResponse[]>(`${this._baseUrl}getAllUsers`).pipe(
      map(trips => trips.map(trip => new UserListApiModel(trip)))
    );
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
