import { Injectable } from '@angular/core';
import { TripServiceModule } from '../../../trip-service.module';
import { HttpService } from '../../../../../core/services/http.service';
import { Observable, of } from 'rxjs';
import { TripListApiModel } from '../models/trip-list-api-model';
import { UserListModel } from '../../../../admin/pages/users-list/models/user-list-model';
import { UserRole } from '../../../../../core/user-identity/enums/user-role.enum';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: TripServiceModule
})
export class TripsListApiService {

  private readonly _baseUrl = `${this._http.baseUrl}/trips/`;

  constructor(private readonly _http: HttpService) {
  }

  public getTrips(): Observable<TripListApiModel[]> {
    return this._http.get<TripListApiModel[]>(`${this._baseUrl}getUserTrips`).pipe(
      map(trips => trips.map(trip => new TripListApiModel(trip)))
    );
  }

  public cancelTrip(tripId: number): Observable<boolean> {
    return of(true);
  }

  public getGuidesToTripAssigne(tripId: number): Observable<UserListModel[]> {
    const users: UserListModel[] = [];

    users.push({
      id: 1,
      email: 'test1@email.com',
      firstName: 'Adam',
      lastName: 'Małysz',
      role: UserRole.Guide,
      isBlocked: false,
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
      role: UserRole.Guide,
      isBlocked: false,
      isForcedPasswordChange: true
    });

    return of(users);
  }
}
