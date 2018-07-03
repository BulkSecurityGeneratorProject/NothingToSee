import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router'
import { AppComponent } from './app.component';
import { PlanningComponent } from './planning/planning.component';


const appRoutes: Routes = [
    { path: '', redirectTo: '/planning', pathMatch: 'full' },
    { path: 'planning', component: PlanningComponent },
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