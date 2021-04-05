import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouting } from './core/configurations/routing/app-routing';
import { NotAuthenticatedGuard } from './core/user-identity/guards/not-authenticated.guard';
import { UserComponent } from './modules/user/user.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { TripsListComponent } from './modules/trip/pages/trips-list/trips-list.component';


const routes: Routes = [
  {
    path: AppRouting.user.root,
    canActivate: [ NotAuthenticatedGuard ],
    component: UserComponent,
    loadChildren: () => import('./modules/user/user.module').then(mod => mod.UserModule)
  },
  {
    path: AppRouting.admin.root,
    // canActivate: [ NotAuthenticatedGuard ],
    component: NavigationComponent,
    loadChildren: () => import('./modules/admin/admin.module').then(mod => mod.AdminModule)
  },
  {
    path: AppRouting.trip.root,
    // canActivate: [ NotAuthenticatedGuard ],
    component: NavigationComponent,
    loadChildren: () => import('./modules/trip/trip.module').then(mod => mod.TripModule)
  },
  // {
  //   path: AppRouting.home.root,
  //   component: NavigationComponent,
  //   canActivate: [ AuthenticationGuard ],
  //   loadChildren: () => import('./modules/xxx/xxx.module').then(mod => mod.PlaylistModule)
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRouting.trip.tripsList.absolutePath
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
