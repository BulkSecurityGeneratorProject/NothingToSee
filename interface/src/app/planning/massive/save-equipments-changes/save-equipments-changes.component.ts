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
  constructor( formBuilder: FormBuilder ) {
    super( formBuilder );
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
    if ( this.form.valid ) {
      this.eventStepEvaluationDone(1);
    } else {
      for( let i in this.form.controls ) {
        this.form.controls[i].markAsTouched();
      }
      this.eventStepEvaluationDone(0);
    }
  }
  save() {

  }
}
