import { NgModule } from '@angular/core';
import { PlanningComponent } from './planning.component';
import { SearchEquipmentsComponent } from './search-equipments/search-equipments.component';
import { ChangeEquipmentsComponent } from './change-equipments/change-equipments.component';
import { SaveEquipmentsChangesComponent } from './save-equipments-changes/save-equipments-changes.component';
import { CustomMaterialModule } from '../shared/material/custom-material.module';
import {MatInputModule} from '@angular/material'

@NgModule({
  declarations:[
    PlanningComponent,
    SearchEquipmentsComponent,
    ChangeEquipmentsComponent,
    SaveEquipmentsChangesComponent
  ],
  imports: [
    CustomMaterialModule,
    MatInputModule
  ]
})
export class PlanningModule {}
