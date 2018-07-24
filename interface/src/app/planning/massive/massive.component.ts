import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core'
import { Step, Status } from '../../shared/models/step';
import { EquipmentSearchComponent } from './equipment-search/equipment-search.component';
import { EquipmentChangeComponent } from './equipment-change/equipment-change.component';
import { SaveEquipmentChangeComponent } from './save-equipment-change/save-equipment-change.component';
import { StateComponent } from '../state.component';
import { MatStepper } from '@angular/material';


@Component({
    selector: 'app-container',
    templateUrl: './massive.component.html',
    styleUrls: ['./massive.component.scss']
})
export class MassiveComponent extends StateComponent {
    @ViewChild('stepper') stepper: MatStepper;
    constructor( componentFactoryResolver: ComponentFactoryResolver) {
        super( componentFactoryResolver );
    }
    initializeSteps() {
        this.steps.push(new Step('Procurar equipamentos', Status.ACTUAL, EquipmentSearchComponent, 0));
        this.steps.push(new Step('Realizar manobras', Status.NOT_ACTIVATED, EquipmentChangeComponent, 1));
        this.steps.push(new Step('Simular e salvar', Status.NOT_ACTIVATED, SaveEquipmentChangeComponent, 2));
        this.eventStepChange();
        this.setInitialStep(0);
    }
    isLoaded(number: number) {
        return (this.stepsFormHistory[number]) ? true : false;
    }
    eventForward(index) {
        super.eventForward(index);
        if (this.stepper.selectedIndex !== index) {
            this.stepper.selectedIndex = index;
        }
    }
    eventStepChange() {
        this.subscriptions.add(this.stepper.selectionChange.subscribe((event) => {
            if ( event.selectedIndex !== this.step.number ) {
                let index = event.selectedIndex;
                if ( index > this.step.number ) {
                    this.eventForward(index);
                } else {
                    this.eventBackward(index);
                }
            }
        }))
    }
    setInitialStep(index) {
        this.stepper.selectedIndex = index;
        super.setInitialStep(index);
    }
}