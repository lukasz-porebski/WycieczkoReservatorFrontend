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
  private canBeCanceled: boolean;

  constructor(private readonly bookingDetailsApiService: BookingDetailsApiService, private readonly _route: ActivatedRoute) { }

  ngOnInit(): void {
    const bookingId = this._route.snapshot.paramMap.get('id');
    this.bookingDetailsApiService.getBookingDetails(bookingId).subscribe(trip=>{
    this.bookingDetailsModel=trip;
    if ( Date.parse(this.bookingDetailsModel.startDate) - new Date().valueOf()>= 604800000){
      this.canBeCanceled = true;
    }else this.canBeCanceled = false;
    })
  }

  cancelTrip(): void {
    if ( Date.parse(this.bookingDetailsModel.startDate) - new Date().valueOf()>= 604800000){
        const bookingId = this._route.snapshot.paramMap.get('id');
        this.bookingDetailsApiService.cancelReservation(bookingId).subscribe(trip=>{
        this.bookingDetailsModel=trip})
    }
  }

}
