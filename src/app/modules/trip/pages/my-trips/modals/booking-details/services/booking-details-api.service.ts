import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "src/app/core/services/http.service";
import { TripServiceModule } from "src/app/modules/trip/trip-service.module";
import { BookingDetailsApiModel } from "../models/booking-details-api-model";

@Injectable({
    providedIn: TripServiceModule
  })
  export class BookingDetailsApiService{
    private readonly _baseUrl = `${this._http.baseUrl}/trips`;

    constructor(private readonly _http: HttpService) {
    }

    public getBookingDetails(id:string): Observable<BookingDetailsApiModel> {
        const url = this._baseUrl + '/getBookedTripDetails';
        let params = new HttpParams();
        params = params.append('reservationId', id);
    
        return this._http.get<BookingDetailsApiModel>(url, {params: params});
      }


  }