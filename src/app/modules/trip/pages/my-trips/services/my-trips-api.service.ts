import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "src/app/core/services/http.service";
import { UserRole } from "src/app/core/user-identity/enums/user-role.enum";
import { AuthenticationService } from "src/app/core/user-identity/services/authentication.service";
import { MyTripsApiModel } from "../models/my-trips-api-model";
import { map } from 'rxjs/operators';
import { TripServiceModule } from "../../../trip-service.module";

@Injectable({
    providedIn: TripServiceModule
  })
  export class MyTripsApiService {
    constructor(private readonly _http: HttpService,
                private readonly _authenticationService: AuthenticationService) {
    }

    public getTrips(): Observable<MyTripsApiModel[]> {
        const url = this._authenticationService.token.userRole === UserRole.User;
        return this._http.get<MyTripsApiModel[]>(`${this._http.baseUrl}/trips/getUserTrips`).pipe(
          map(trips => trips.map(trip => new MyTripsApiModel(trip)))
        );
      }

}