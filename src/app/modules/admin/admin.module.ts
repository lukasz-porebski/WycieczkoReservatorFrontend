import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminApiServiceModule } from './admin-api-service.module';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    AdminRoutingModule,
    AdminApiServiceModule,
    SharedModule
  ]
})
export class AdminModule {
}
