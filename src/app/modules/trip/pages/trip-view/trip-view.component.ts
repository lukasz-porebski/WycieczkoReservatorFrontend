import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TripViewModel } from './models/trip-view-model';
import { TripViewApiService } from './services/trips-view-api.service';

export interface ITripViewModalData {
  actionText: string;
  trip: TripViewModel;
  action: (trip: TripViewModel) => Observable<any>;
}

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss']
})

export class TripViewComponent implements OnInit {

  private tripViewModel: TripViewModel;
  private imagesSlider: object[];

  constructor(private readonly tripViewApiService: TripViewApiService,
    private readonly _route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    this.tripViewApiService.getTrip(id).subscribe(trip=>{
      this.tripViewModel=trip;
      this.imagesSlider = trip.otherImageUrl.map(url => {
        return {image:url, thumbImage:url}
      });
    });
  }

}
