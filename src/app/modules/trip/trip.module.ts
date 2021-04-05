import { NgModule } from '@angular/core';
import { TripsListComponent } from './pages/trips-list/trips-list.component';
import { TripRoutingModule } from './trip-routing.module';
import { TripServiceModule } from './trip-service.module';
import { SharedModule } from '../../shared/shared.module';
import { TripsListActionConfirmationModalComponent } from './pages/trips-list/modals/trips-list-action-confirmation-modal/trips-list-action-confirmation-modal.component';


@NgModule({
  declarations: [
    TripsListComponent,
    TripsListActionConfirmationModalComponent
  ],
  imports: [
    TripRoutingModule,
    TripServiceModule,
    SharedModule
  ]
})
export class TripModule {
}
