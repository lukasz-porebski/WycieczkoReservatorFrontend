import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRouting } from '../../core/configurations/routing/children/user-routing';
import { LogInComponent } from './pages/log-in/log-in.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { PasswordReminderComponent } from './pages/password-reminder/password-reminder.component';
import { PasswordChangerComponent } from './pages/password-changer/password-changer.component';
import { MyTripsComponent } from './pages/my-trips/my-trips.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: UserRouting.logIn.path
  },
  {
    path: UserRouting.logIn.path,
    component: LogInComponent
  },
  {
    path: UserRouting.registration.path,
    component: RegistrationComponent
  },
  {
    path: UserRouting.passwordReminder.path,
    component: PasswordReminderComponent
  },
  {
    path: UserRouting.passwordChanger.path,
    component: PasswordChangerComponent
  },
  {
    path: UserRouting.myTrips.path,
    component: MyTripsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserRoutingModule {
}
