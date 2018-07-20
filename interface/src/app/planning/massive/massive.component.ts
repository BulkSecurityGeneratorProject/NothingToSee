import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core'
import { Step, Status } from '../../shared/models/step';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { EquipmentChangeComponent } from './equipment-change/equipment-change.component';
import { SaveEquipmentChangeComponent } from './save-equipment-change/save-equipment-change.component';
import { StateComponent } from '../state.component';
import { MatStepper } from '@angular/material';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'app-container',
    templateUrl: './massive.component.html',
    styleUrls: ['./massive.component.scss']
})
export class MassiveComponent extends StateComponent {
    @ViewChild('stepper') stepper: MatStepper;
    stepChangeDone = false;
    constructor( componentFactoryResolver: ComponentFactoryResolver) {
        super( componentFactoryResolver );
    }
    initializeSteps() {
        this.steps.push(new Step('Procurar equipamentos', Status.ACTUAL, EquipmentSearchComponent, 0));
        this.steps.push(new Step('Realizar manobras', Status.NOT_ACTIVATED, EquipmentChangeComponent, 1));
        this.steps.push(new Step('Simular e salvar', Status.NOT_ACTIVATED, SaveEquipmentChangeComponent, 2));
        this.setInitialStep(0);
        this.eventStepChange();
    }
    isCompleted( number: number ) {
        let form: FormGroup = this.stepsFormHistory[number];
        return (form) ? form.valid : false;
    }
    eventBackward( index ) {
        this.stepper.previous();
        super.eventBackward(index);
        this.stepChangeDone = false;
    }
    eventStepChange() {
        this.subscriptions.add(this.stepper.selectionChange.subscribe((event) => {
            if ( event.selectedIndex !== this.step.number  && !this.stepChangeDone ) {
                this.stepChangeDone = true;
                let index = event.selectedIndex;
                if ( index > this.step.number ) {
                    this.eventForward(index);
                } else {
                    this.eventBackward(index);
                }
            }
        }))
    }
}