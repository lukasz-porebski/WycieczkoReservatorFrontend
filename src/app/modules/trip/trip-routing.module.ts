import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsListComponent } from './pages/trips-list/trips-list.component';
import { TripRouting } from '../../core/configurations/routing/children/trip-routing';
import { TripViewComponent } from './pages/trip-view/trip-view.component';
import { MyTripsComponent } from './pages/my-trips/my-trips.component';
import { BookingDetailsComponent } from './pages/my-trips/modals/booking-details/booking-details.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: TripRouting.tripsList.path
  },
  {
    path: TripRouting.tripsList.path,
    component: TripsListComponent
  },
  {
    path: `${TripRouting.tripView.path}/:id`,
    component: TripViewComponent
  },
  {
    path: TripRouting.myTrips.path,
    component: MyTripsComponent
  },
  {
    path: `${TripRouting.bookingDetails.path}/:id`,
    component: BookingDetailsComponent
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TripRoutingModule {
}
