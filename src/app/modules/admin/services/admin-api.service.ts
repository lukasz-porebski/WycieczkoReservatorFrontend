import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/services/http.service';
import { Observable, of } from 'rxjs';
import { UserListModel } from '../pages/users-list/models/user-list-model';
import { UserRole } from '../../../core/user-identity/enums/user-role.enum';
import { AdminServiceModule } from '../admin-service.module';
import { ChangeUserRoleRequestModel } from '../pages/users-list/modals/user-role-change-modal/models/requests/change-user-role-request-model';
import { TripApiModel } from '../pages/trip-persister/models/api/trip-api-model';
import { FormOfTransport } from '../pages/trip-persister/enums/form-of-transport.enum';

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

  public getTrip(tripId: number): Observable<TripApiModel> {
    console.log('getTrip', tripId);
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
}
