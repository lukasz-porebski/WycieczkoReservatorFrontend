import { Injectable } from '@angular/core';
import { TripServiceModule } from '../../../trip-service.module';
import { HttpService } from '../../../../../core/services/http.service';
import { Observable } from 'rxjs';
import { TripListApiModel } from '../models/trip-list-api-model';
import { UserListApiModel, UserListApiResponse } from '../../../../admin/pages/users-list/models/user-list-api-model';
import { UserRole } from '../../../../../core/user-identity/enums/user-role.enum';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../../../../core/user-identity/services/authentication.service';

@Injectable({
  providedIn: TripServiceModule
})
export class TripsListApiService {
  constructor(private readonly _http: HttpService,
              private readonly _authenticationService: AuthenticationService) {
  }

  public getTrips(): Observable<TripListApiModel[]> {
    const url = this._authenticationService.token.userRole === UserRole.Guide
      ? 'getGuideTrips'
      : 'getAllTrips';
    return this._http.get<TripListApiModel[]>(`${this._http.baseUrl}/trips/${url}`).pipe(
      map(trips => trips.map(trip => new TripListApiModel(trip)))
    );
  }

  public cancelTrip(tripId: number): Observable<void> {
    return this._http.delete(`${this._http.baseUrl}/trips/deleteTrip?tripId=${tripId}`);
  }

  public getGuidesToTripAssigne(tripId: number): Observable<UserListApiModel[]> {
    return this._http.get<UserListApiResponse[]>(`${this._http.baseUrl}/users/getAllGuides`).pipe(
      map(trips => trips.map(trip => new UserListApiModel(trip)))
    );
  }

  public assigneGuideToTrip(tripId: number, guideId: number): Observable<void> {
    return this._http.put(
      `${this._http.baseUrl}/trips/assignGuide?tripId=${tripId}&guideId=${guideId}`, null);
  }
}

