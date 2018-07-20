import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { StepComponent } from '../../step.component';

@Component({
  selector: 'save-equipment-change',
  templateUrl: './save-equipment-change.component.html',
  styleUrls: ['./save-equipment-change.component.scss']
})
export class SaveEquipmentChangeComponent extends StepComponent {
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
