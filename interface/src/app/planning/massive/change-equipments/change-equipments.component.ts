import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { StepComponent } from '../../step.component';
import { ChangeEquipmentsService } from './change-equipments.service';
import { Equipment } from '../../../shared/models/equipment';

@Component({
  selector: 'change-equipments',
  templateUrl: './change-equipments.component.html',
  styleUrls: ['./change-equipments.component.scss']
})
export class ChangeEquipmentsComponent extends StepComponent {
  equipments = [];
  sourceEquipment: Equipment;
  targetEquipment: Equipment;

  constructor( formBuilder: FormBuilder, private changeEquipmentsService: ChangeEquipmentsService ) {
    super( formBuilder );
  }
  ngOnInit() {
    this.initializeForms();
    this.initializeEquipments();
    this.onChanges();
    super.ngOnInit();
  }
  initializeForms() {
    if ( !this.form ) {
      const formFields = {
        sourceEquipment: [null, Validators.required],
        targetEquipment: [null, Validators.required],
      }
      super.initializeForms( formFields );
    }
  }
  initializeEquipments() {
    this.changeEquipmentsService.getEquipments( this.lastForm.getRawValue() )
      .subscribe(( equipments ) =>  {
        this.equipments = equipments
      });
  }
  onChanges() {
    this.form.get('sourceEquipment').valueChanges.subscribe(val => {
      this.sourceEquipment = val;
    });
    this.form.get('targetEquipment').valueChanges.subscribe(val => {
      this.targetEquipment = val;
    });
  }
  validateForm() {
    if ( this.form.valid) {
      this.eventStepEvaluationDone(1);
    } else {
      for( let i in this.form.controls ) {
        this.form.controls[i].markAsTouched();
      }
      this.eventStepEvaluationDone(0);
    }
  }
  save() {}
}
