import { NgModule } from '@angular/core';
import { TripsListComponent } from './pages/trips-list/trips-list.component';
import { TripRoutingModule } from './trip-routing.module';
import { TripServiceModule } from './trip-service.module';
import { SharedModule } from '../../shared/shared.module';
import { TripsListActionConfirmationModalComponent } from './pages/trips-list/modals/trips-list-action-confirmation-modal/trips-list-action-confirmation-modal.component';
import { GuideToTripAssignerModalComponent } from './pages/trips-list/modals/guide-to-trip-assigner-modal/guide-to-trip-assigner-modal.component';


@NgModule({
  declarations: [
    TripsListComponent,
    TripsListActionConfirmationModalComponent,
    GuideToTripAssignerModalComponent
  ],
  imports: [
    TripRoutingModule,
    TripServiceModule,
    SharedModule
  ]
})
export class TripModule {
}
