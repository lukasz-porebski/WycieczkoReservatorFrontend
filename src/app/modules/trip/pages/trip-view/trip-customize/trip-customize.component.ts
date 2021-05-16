import { Component, OnInit } from '@angular/core';
import { TripBookModel } from '../models/trip-book-model';
import { TripViewModel } from '../models/trip-view-model';
import { TripViewApiService } from '../services/trips-view-api.service';

@Component({
  selector: 'app-trip-customize',
  templateUrl: './trip-customize.component.html',
  styleUrls: ['./trip-customize.component.scss']
})
export class TripCustomizeComponent implements OnInit {

  private tripViewModel: TripViewModel;

  constructor(private readonly tripViewApiService: TripViewApiService) { }

  number_of_participants: number;

  ngOnInit(): void {
    this.tripViewApiService.getTrip(1).subscribe(trip=>{
      this.tripViewModel=trip;
      this.number_of_participants=trip.participants[0]})
  }

  bookTrip(): void{
    let booking ={ participants : this.number_of_participants,
          pricePerSingleParticipant : this.tripViewModel.pricePerSingleParticipant,
          tripId:  this.tripViewModel.tripId,
          meal: this.tripViewModel.meal
    }
    this.tripViewApiService.bookTrip(booking);
}


}
