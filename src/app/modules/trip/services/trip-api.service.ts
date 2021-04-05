import { Injectable } from '@angular/core';
import { TripServiceModule } from '../trip-service.module';
import { HttpService } from '../../../core/services/http.service';
import { Observable, of } from 'rxjs';
import { TripListModel } from '../pages/trips-list/models/trip-list-model';

@Injectable({
  providedIn: TripServiceModule
})
export class TripApiService {

  private readonly _baseUrl = `${this._http.baseUrl}/trip/`;

  constructor(private readonly _http: HttpService) {
  }

  public getTrips(): Observable<TripListModel[]> {
    const users: TripListModel[] = [];

    users.push({
      id: 1,
      title: 'Playa Bachata Resort (ex. Riu Merengue)',
      minPrice: 1252.65,
      mainImageUrl: 'https://i.wakacje.pl/no-index/hotel/dominikana/playa-bachata-resort-basen-sport-i-rekreacja-777496349-950-480.jpg'
    });

    users.push({
      id: 2,
      title: 'Globales Cala Vinas (ex. Sentido Cala Vinas)',
      minPrice: 985.1,
      mainImageUrl: 'https://i.wakacje.pl/no-index/hotel/hiszpania/globales-cala-vinas-ex-sentido-cala-vinas-basen-842770111-950-480.jpg'
    });

    users.push({
      id: 3,
      title: 'Iberostar Paraiso del Mar',
      minPrice: 1911.25,
      mainImageUrl: 'https://i.wakacje.pl/no-index/hotel/meksyk/iberostar-paraiso-del-mar-teren-hotelu-basen-844747583-950-480.jpg'
    });

    return of(users);
  }

  public cancelTrip(tripId: number): Observable<boolean> {
    return of(true);
  }
}
