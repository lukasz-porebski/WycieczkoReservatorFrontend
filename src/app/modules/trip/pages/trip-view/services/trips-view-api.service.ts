import { Injectable } from '@angular/core';
import { TripServiceModule } from '../../../trip-service.module';
import { HttpService } from '../../../../../core/services/http.service';
import { Observable, of } from 'rxjs';
import { TripViewModel } from '../models/trip-view-model';
import { TripBookModel } from '../models/trip-book-model';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: TripServiceModule
})
export class TripViewApiService {

  private readonly _baseUrl = `${this._http.baseUrl}/trips`;

  constructor(private readonly _http: HttpService) {
  }

  public getTrip(id:string): Observable<TripViewModel> {
    const url = this._baseUrl + '/getTripDetails';
    let params = new HttpParams();
    params = params.append('tripId', id);

    return this._http.get<TripViewModel>(url, {params: params});
  }

  public bookTrip(booking:TripBookModel): Observable<TripBookModel>{
    
    return of(booking);
  }

}
