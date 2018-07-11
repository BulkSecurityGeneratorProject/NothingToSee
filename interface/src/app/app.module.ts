import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app.routing.module';
import { CustomMaterialModule } from './shared/material/custom-material.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { PlanningModule } from './planning/planning.module';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './api/jwt-interceptor.service';
import { ErrorInterceptor } from './api/http-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    CustomMaterialModule,
    PlanningModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
