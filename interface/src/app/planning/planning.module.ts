import { NgModule } from '@angular/core';
import { PlanningComponent } from './planning.component';
import { CustomMaterialModule } from '../shared/material/custom-material.module';
import { MatInputModule } from '@angular/material'
import { DynamicDirective } from '../shared/directive/dynamic.directive';
import * as DynamicForms from '.';

const dynamics = [];
let keys = Object.keys(DynamicForms);
for ( let key of keys ) {
  dynamics.push( DynamicForms[key] );
}

@NgModule({
  declarations: [PlanningComponent, 
    DynamicDirective, ...dynamics],
  imports: [
    CustomMaterialModule,
    MatInputModule
    
  ],
  entryComponents: dynamics
})
export class PlanningModule { 
  constructor() {}
}
