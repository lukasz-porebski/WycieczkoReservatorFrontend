import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRouting } from 'src/app/core/configurations/routing/app-routing';
import { TripViewModel } from '../models/trip-view-model';
import { TripViewApiService } from '../services/trips-view-api.service';

@Component({
  selector: 'app-trip-customize',
  templateUrl: './trip-customize.component.html',
  styleUrls: ['./trip-customize.component.scss']
})
export class TripCustomizeComponent implements OnInit {

  private tripViewModel: TripViewModel;
  private number_of_participants: number;

  constructor(private readonly tripViewApiService: TripViewApiService,  
    private readonly _route: ActivatedRoute,
    private readonly _router: Router) { }


  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.tripViewApiService.getTrip(id).subscribe(trip=>{
      this.tripViewModel=trip;
      this.number_of_participants=trip.participants[0]})
  }

  bookTrip(): void{
    const id = this._route.snapshot.paramMap.get('id');
    let booking ={ participants : this.number_of_participants,
          pricePerSingleParticipant : this.tripViewModel.pricePerSingleParticipant,
          tripId: parseInt(id),
          meal: this.tripViewModel.meal
    }
    this.tripViewApiService.bookTrip(booking).subscribe( () => this._router.navigateByUrl(AppRouting.trip.myTrips.absolutePath));
}


}
