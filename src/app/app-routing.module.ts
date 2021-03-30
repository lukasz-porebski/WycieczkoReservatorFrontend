import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouting } from './core/configurations/routing/app-routing';
import { NotAuthenticatedGuard } from './core/user-identity/guards/not-authenticated.guard';
import { HomeComponent } from './modules/home/home.component';
import { UserComponent } from './modules/user/user.component';

const routes: Routes = [
  {
    path: AppRouting.home.root,
    component: HomeComponent,
    // canActivate: [ NotAuthenticatedGuard ]
  },
  {
    path: AppRouting.user.root,
    canActivate: [ NotAuthenticatedGuard ],
    component: UserComponent,
    loadChildren: () => import('./modules/user/user.module').then(mod => mod.UserModule)
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
