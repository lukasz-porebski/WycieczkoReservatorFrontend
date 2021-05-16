import { Injectable } from '@angular/core';
import { TripServiceModule } from '../../../trip-service.module';
import { HttpService } from '../../../../../core/services/http.service';
import { Observable, of } from 'rxjs';
import { TripViewModel } from '../models/trip-view-model';


@Injectable({
  providedIn: TripServiceModule
})
export class TripViewApiService {

  private readonly _baseUrl = `${this._http.baseUrl}/trip/`;

  constructor(private readonly _http: HttpService) {
  }

  public getTrip(id:number): Observable<TripViewModel> {
    const url = this._baseUrl + id;

    let trip: TripViewModel ={
      tripId: 1,
      title: 'Playa Bachata Resort (ex. Riu Merengue)',
      description: 'Położenie: Wybudowany w karaibskim stylu Hotel Playa Bachata położony jest w zatoce Maimon Bay, bezpośrednio przy złotej, piaszczystej plaży w ogrodzie z bujną tropikalną roślinnością i malowniczym widokiem na góry. Razem z sąsiednim hotelem Senator Puerto Plata Spa Resort tworzy rozległy i komfortowy kompleks hotelowy (klienci hotelu Playa Bachata nie mogą korzystać z infrastruktury hotelu Senator Puerto Plata Spa Resort). Do centrum Puerto Plata - stolicy regionu jest stąd ok. 9km. Do centrum można się dostać taksówką. Dodatkowo w odległości ok. 300m od hotelu znajduje się główna droga, którą przemieszcza się komunikacja miejska. Do lotniska w Puerto Plata jest ok. 25km.',
      
      pricePerSingleParticipant: 1252.65,
      participants: [1,3,4],
      meal: true,
      departureLocation: 'Katowice',
      tripLocation: 'Dominikana',
      startDate: new Date(2021,5,1),
      endDate: new Date(2021,5,7),
      formOfTransport: 'samolot',
      mainImageUrl: 'https://i.wakacje.pl/no-index/hotel/dominikana/playa-bachata-resort-basen-sport-i-rekreacja-777496349-950-480.jpg',
      otherImageUrl: ['https://i.wakacje.pl/no-index/hotel/dominikana/playa-bachata-resort-basen-sport-i-rekreacja-777496349-950-480.jpg',
                      'https://i.wakacje.pl/no-index/hotel/egipt/albatros-palace-resort-basen-wakacjepl-808516122-1200-800.jpg',
                    'https://i.wakacje.pl/no-index/hotel/egipt/albatros-palace-resort-basen-wakacjepl-808517041-1200-800.jpg'],
      minPrice: 1252.65,
    };

    return of(trip);
  }

}
