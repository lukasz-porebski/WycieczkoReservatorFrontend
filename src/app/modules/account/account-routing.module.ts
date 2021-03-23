import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountRouting } from '../../core/configurations/routing/account/account-routing';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SharedModule } from '../../shared/shared.module';


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
  // {
  //   path: AccountRouting.registration.path,
  //   component: RegistrationComponent
  // }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AccountRoutingModule {
}
