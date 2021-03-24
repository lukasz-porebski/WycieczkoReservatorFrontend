import { NgModule } from '@angular/core';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AccountRoutingModule } from './account-routing.module';
import { AccountApiServiceModule } from './account-api-service.module';
import { AccountComponent } from './account.component';
import { RegistrationComponent } from './pages/registration/registration.component';

@NgModule({
  imports: [
    AccountRoutingModule,
    MatProgressSpinnerModule,
    AccountApiServiceModule,
    SharedModule,
  ],
  declarations: [
    AccountComponent,
    LogInComponent,
    RegistrationComponent
  ],
})
export class AccountModule {
}
