import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { AdminRouting } from '../../core/configurations/routing/children/admin-routing';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AdminRouting.usersList.path
  },
  {
    path: AdminRouting.usersList.path,
    component: UsersListComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {
}
