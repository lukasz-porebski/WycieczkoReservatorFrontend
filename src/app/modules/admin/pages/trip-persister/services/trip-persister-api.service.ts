import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from '../../../../../core/services/http.service';
import { AdminServiceModule } from '../../../admin-service.module';
import { TripApiModel } from '../models/api/trip-api-model';
import { FormOfTransport } from '../../../../_domain-common/enums/form-of-transport.enum';
import { CreateTripRequestModel } from '../models/requests/create-trip-request-model';
import { EditTripRequestModel } from '../models/requests/edit-trip-request-model';
import { UserListModel } from '../../users-list/models/user-list-model';
import { UserRole } from '../../../../../core/user-identity/enums/user-role.enum';

@Injectable({
  providedIn: AdminServiceModule
})
export class TripPersisterApiService {

  private readonly _baseUrl = `${this._http.baseUrl}/admin/`;

  constructor(private readonly _http: HttpService) {
  }

  public getTrip(tripId: number): Observable<TripApiModel> {
    const trip = new TripApiModel({
      id: 1,
      title: 'Wycieczka do Kazimierza',
      description: 'Długi opis',
      participants: [ 1, 2, 4 ],
      pricePerSingleParticipant: 45.8,
      roomSizes: [ 2, 4 ],
      pricePerSingleRoom: 12.4,
      meal: true,
      pricePerSingleDayOfMeals: 3,
      departureLocation: 'Katowice - Spodek',
      tripLocation: 'Kazimierz Dolny',
      formOfTransport: FormOfTransport.Plane,
      guideId: 2,
      mainImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Widok_Kazimierz_Dolny.jpg',
      otherImageUrls: [
        'https://w10inspiracjidookolaswiata.pl/wp-content/uploads/2020/07/Kazimierz-Dolny-najwieksze-atrakcje.jpg',
        'https://i.nocimg.pl/nocadv/artykuly/f-d/2018/6/1/5/28020-1.jpg',
      ],
      startDate: new Date(2021, 10, 15),
      endDate: new Date(2021, 10, 21),
    });

    return of(trip);
  }

  public createTrip(request: CreateTripRequestModel): Observable<boolean> {
    return of(true);
  }

  public editTrip(request: EditTripRequestModel): Observable<boolean> {
    return of(true);
  }

  public getGuidesToTripAssigne(): Observable<UserListModel[]> {
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
