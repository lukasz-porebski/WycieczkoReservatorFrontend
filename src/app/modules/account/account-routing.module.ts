import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRouting } from '../../core/configurations/routing/account/account-routing';
import { LogInComponent } from './pages/log-in/log-in.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { PasswordReminderComponent } from './pages/password-reminder/password-reminder.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AccountRouting.logIn.path
  },
  {
    path: AccountRouting.logIn.path,
    component: LogInComponent
  },
  {
    path: AccountRouting.registration.path,
    component: RegistrationComponent
  },
  {
    path: AccountRouting.passwordReminder.path,
    component: PasswordReminderComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AccountRoutingModule {
}
