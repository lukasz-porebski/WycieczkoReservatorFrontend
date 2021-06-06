import { NgModule } from '@angular/core';
import { TripsListComponent } from './pages/trips-list/trips-list.component';
import { TripRoutingModule } from './trip-routing.module';
import { TripServiceModule } from './trip-service.module';
import { TripsListActionConfirmationModalComponent } from './pages/trips-list/modals/trips-list-action-confirmation-modal/trips-list-action-confirmation-modal.component';
import { GuideToTripAssignerModalComponent } from './pages/trips-list/modals/guide-to-trip-assigner-modal/guide-to-trip-assigner-modal.component';
import { DomainCommonModule } from '../_domain-common/domain-common.module';
import { TripViewComponent } from './pages/trip-view/trip-view.component';
import { TripCustomizeComponent } from './pages/trip-view/trip-customize/trip-customize.component';
import { MyTripsComponent } from './pages/my-trips/my-trips.component';


@NgModule({
  declarations: [
    TripsListComponent,
    TripsListActionConfirmationModalComponent,
    GuideToTripAssignerModalComponent,
    TripViewComponent,
    TripCustomizeComponent,
    MyTripsComponent
  ],
  imports: [
    TripRoutingModule,
    TripServiceModule,
    DomainCommonModule
  ]
})
export class TripModule {
}
