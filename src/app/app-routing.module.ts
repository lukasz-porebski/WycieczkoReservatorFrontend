import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouting } from './core/configurations/routing/app-routing';
import { NotAuthenticatedGuard } from './core/user-identity/guards/not-authenticated.guard';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { AuthenticationGuard } from './core/user-identity/guards/authentication.guard';
import { HomeComponent } from './modules/home/home.component';
import { UserIdentityComponent } from './core/user-identity/component/user-identity.component';

const routes: Routes = [
  {
    path: AppRouting.home.root,
    component: HomeComponent,
    // canActivate: [ NotAuthenticatedGuard ]
  },
  {
    path: AppRouting.login.root,
    component: UserIdentityComponent,
    canActivate: [ NotAuthenticatedGuard ]
  },
  {
    path: AppRouting.home.root,
    component: NavigationComponent,
    // canActivate: [ AuthenticationGuard ],
    // loadChildren: () => import('./modules/xxx/xxx.module').then(mod => mod.PlaylistModule)
  },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [ NotAuthenticatedGuard ],
    component: HomeComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
