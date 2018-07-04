import { MatStepperModule, MatFormFieldModule, MatInputModule, MatIconModule, MatBadgeModule, 
MatIconRegistry, MatToolbarModule, MatSidenavModule, MatButtonModule, MatButtonToggleModule } from '@angular/material'
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  exports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule
  ]
})
export class CustomMaterialModule {
  constructor(
    public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}