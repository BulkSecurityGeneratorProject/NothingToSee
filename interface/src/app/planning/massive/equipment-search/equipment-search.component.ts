import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { StepComponent } from '../../step.component';
import { EquipmentSearchService } from './equipment-search.service';
import { ExecutionDiary } from '../../../shared/models/execution-diary';

@Component({
  selector: 'equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.scss']
})
export class EquipmentSearchComponent extends StepComponent {
  executionDiaries = [];
  formBuilder: FormBuilder;
  constructor( formBuilder: FormBuilder, private equipmentSearchService: EquipmentSearchService ) {
    super();
    this.formBuilder = formBuilder;
  }
  ngOnInit() {
    this.initializeForms();
    this.initializeExecutionDiaries();
    super.ngOnInit();
  }
  initializeForms() {
    if ( !this.form ) {
      const formFields = {
        executionDiaryId: ['', Validators.required],
        cnl: ['', Validators.required],
        at: ['', Validators.required]
      }
      super.initializeForms( formFields );
    }
  }
  initializeExecutionDiaries() {
    this.equipmentSearchService.getAllExecutionDiaries().subscribe((diaries: Array<ExecutionDiary>) => {
      this.executionDiaries = diaries;
    })
  }
  validateForm() {
    if ( this.form.valid ) {
      return true;
    } else {
      for ( let i in this.form.controls ) {
        this.form.controls[i].markAsTouched();
      }
      return false;
    }
  }
  eventSave() {
    if (this.validateForm()) {
      super.eventSave();
    }
  }
}
