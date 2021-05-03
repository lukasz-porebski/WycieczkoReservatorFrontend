import { Component, OnInit } from '@angular/core';
import { TripViewModel } from './models/trip-view-model';
import { TripViewApiService } from './services/trips-view-api.service';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss']
})
export class TripViewComponent implements OnInit {

  private tripViewModel: TripViewModel;
  private imagesSlider: object[];

  constructor(private readonly tripViewApiService: TripViewApiService) { }

  ngOnInit(): void {
    this.tripViewApiService.getTrip(1).subscribe(trip=>{
      this.tripViewModel=trip;
      this.imagesSlider = trip.otherImageUrl.map(url => {
        return {image:url, thumbImage:url}
      });
    });
  }

}
