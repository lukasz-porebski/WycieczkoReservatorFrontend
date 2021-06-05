import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripViewModel } from '../models/trip-view-model';
import { TripViewApiService } from '../services/trips-view-api.service';

@Component({
  selector: 'app-trip-customize',
  templateUrl: './trip-customize.component.html',
  styleUrls: ['./trip-customize.component.scss']
})
export class TripCustomizeComponent implements OnInit {

  private tripViewModel: TripViewModel;

  constructor(private readonly tripViewApiService: TripViewApiService,  private readonly _route: ActivatedRoute) { }

  number_of_participants: number;

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.tripViewApiService.getTrip(id).subscribe(trip=>{
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
