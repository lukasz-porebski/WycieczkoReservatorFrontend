import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { AdminRouting } from '../../core/configurations/routing/children/admin-routing';
import { TripPersisterComponent } from './pages/trip-persister/trip-persister.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AdminRouting.usersList.path
  },
  {
    path: AdminRouting.usersList.path,
    component: UsersListComponent
  },
  {
    path: AdminRouting.tripCreator.path,
    component: TripPersisterComponent
  },
  {
    path: `${AdminRouting.tripEditor.path}/:id`,
    component: TripPersisterComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {
}
