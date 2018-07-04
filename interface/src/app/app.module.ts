import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { CustomMaterialModule } from 'src/app/shared/material/custom-material.module';
import { SideBarComponent } from 'src/app/side-bar/side-bar.component';
import { PlanningModule } from 'src/app/planning/planning.module';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    CustomMaterialModule,
    PlanningModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
