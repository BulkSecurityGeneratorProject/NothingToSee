import { NgModule } from '@angular/core';
import { PlanningComponent } from 'src/app/planning/planning.component';
import { CustomMaterialModule } from 'src/app/shared/material/custom-material.module';

@NgModule({
  declarations:[
    PlanningComponent
  ],
  imports: [
    CustomMaterialModule
  ]
})
export class PlanningModule {}