import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsListComponent } from './pages/trips-list/trips-list.component';
import { TripRouting } from '../../core/configurations/routing/children/trip-routing';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: TripRouting.tripsList.path
  },
  {
    path: TripRouting.tripsList.path,
    component: TripsListComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class TripRoutingModule {
}
