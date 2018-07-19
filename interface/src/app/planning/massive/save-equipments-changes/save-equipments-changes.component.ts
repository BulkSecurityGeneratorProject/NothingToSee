import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { StepComponent } from '../../step.component';

@Component({
  selector: 'save-equipments-changes',
  templateUrl: './save-equipments-changes.component.html',
  styleUrls: ['./save-equipments-changes.component.scss']
})
export class SaveEquipmentsChangesComponent extends StepComponent {
  executionDiaries = [];
  formBuilder: FormBuilder;
  constructor(formBuilder: FormBuilder) {
    super();
    this.formBuilder = formBuilder;
  }
  ngOnInit() {
    this.initializeForms();
    super.ngOnInit();
  }
  initializeForms() {
    if ( !this.form ) {
      const formFields = {
        executionDiaryId: ['-1', Validators.required],
        cnl: ['', Validators.required],
        at: ['', Validators.required]
      }
      super.initializeForms( formFields );
    }
  }
  validateForm() {
  }
  eventSave() {

  }
}
