import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { StepComponent } from '../../step.component';
import { SearchEquipmentsService } from './search-equipments.service';
import { ExecutionDiary } from '../../../shared/models/execution-diary';

@Component({
  selector: 'search-equipments',
  templateUrl: './search-equipments.component.html',
  styleUrls: ['./search-equipments.component.scss']
})
export class SearchEquipmentsComponent extends StepComponent {
  executionDiaries = [];
  formBuilder: FormBuilder;
  constructor( formBuilder: FormBuilder, private searchEquipmentsService: SearchEquipmentsService ) {
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
    this.searchEquipmentsService.getAllExecutionDiaries().subscribe((diaries: Array<ExecutionDiary>) => {
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
