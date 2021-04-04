import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminServiceModule } from './admin-service.module';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { SharedModule } from '../../shared/shared.module';
import { UserRoleChangeModalComponent } from './pages/users-list/modals/user-role-change-modal/user-role-change-modal.component';
import { UserListActionConfirmationModalComponent } from './pages/users-list/modals/user-list-action-confirmation-modal/user-list-action-confirmation-modal.component';
import { TripPersisterComponent } from './pages/trip-persister/trip-persister.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UserRoleChangeModalComponent,
    UserListActionConfirmationModalComponent,
    TripPersisterComponent
  ],
  imports: [
    AdminRoutingModule,
    AdminServiceModule,
    SharedModule
  ]
})
export class AdminModule {
}
