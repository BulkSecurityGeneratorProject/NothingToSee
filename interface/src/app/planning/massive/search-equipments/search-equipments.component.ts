import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { StepComponent } from '../../step.component';

@Component({
  selector: 'search-equipments',
  templateUrl: './search-equipments.component.html',
  styleUrls: ['./search-equipments.component.scss']
})
export class SearchEquipmentsComponent extends StepComponent {
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
