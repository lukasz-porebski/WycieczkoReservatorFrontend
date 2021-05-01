import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../../core/services/http.service';
import { AdminServiceModule } from '../../../admin-service.module';
import { TripApiModel, TripApiResponse } from '../models/api/trip-api-model';
import { CreateTripRequestModel } from '../models/requests/create-trip-request-model';
import { EditTripRequestModel } from '../models/requests/edit-trip-request-model';
import { UserListApiModel, UserListApiResponse } from '../../users-list/models/user-list-api-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: AdminServiceModule
})
export class TripPersisterApiService {
  constructor(private readonly _http: HttpService) {
  }

  public getTrip(tripId: number): Observable<TripApiModel> {
    return this._http.get<TripApiResponse>(`${this._http.baseUrl}/trips/getTripDetails?tripId=${tripId}`)
      .pipe(map(value => new TripApiModel(value)));
  }

  public createTrip(request: CreateTripRequestModel): Observable<void> {
    return this._http.post<void>(`${this._http.baseUrl}/trips/saveTrip`, request);
  }

  public editTrip(request: EditTripRequestModel): Observable<void> {
    return this._http.post<void>(`${this._http.baseUrl}/trips/saveTrip`, request);
  }

  public getGuidesToTripAssigne(): Observable<UserListApiModel[]> {
    return this._http.get<UserListApiResponse[]>(`${this._http.baseUrl}/users/getAllGuides`).pipe(
      map(trips => trips.map(trip => new UserListApiModel(trip)))
    );
  }
}
