import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingDetailsApiModel } from './models/booking-details-api-model';
import { BookingDetailsApiService } from './services/booking-details-api.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  private bookingDetailsModel: BookingDetailsApiModel;

  constructor(private readonly bookingDetailsApiService: BookingDetailsApiService, private readonly _route: ActivatedRoute) { }

  ngOnInit(): void {
    const bookingId = this._route.snapshot.paramMap.get('reservationId');
    this.bookingDetailsApiService.getBookingDetails('reservationId').subscribe(trip=>{
      this.bookingDetailsModel=trip})
  }

}
