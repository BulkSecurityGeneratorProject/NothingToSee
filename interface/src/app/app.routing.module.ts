import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router'
import { PlanningComponent } from './planning/planning.component';
import { AuthGuard } from './guards/auth-guard.service';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/planning', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'planning', component: PlanningComponent, canActivate: [AuthGuard], children: [
      {
        path: 'home',
        component: PlanningComponent
      }, {
        path: '**',
        component: PlanningComponent
      }]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}