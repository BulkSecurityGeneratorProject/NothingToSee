import { Component, OnInit, Renderer, OnDestroy, Input, ViewChild, ComponentFactoryResolver, AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanningService } from '../planning.service';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { DynamicDirective } from '../../shared/directive/dynamic.directive';
import { Step, StepState } from '../../shared/models/stepper';
import { SearchEquipmentsComponent } from './search-equipments/search-equipments.component';
import { ChangeEquipmentsComponent } from './change-equipments/change-equipments.component';
import { SaveEquipmentsChangesComponent } from './save-equipments-changes/save-equipments-changes.component';

@Component({
    selector: 'app-container',
    templateUrl: './massive.component.html',
    styleUrls: ['./massive.component.scss']
})
export class MassiveComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(DynamicDirective) dynamicHost: DynamicDirective;
    steps: Array<Step> = new Array();
    step$: BehaviorSubject<number> = this.planningService.step$;
    actualForm$: BehaviorSubject<FormGroup> = new BehaviorSubject(null);
    unsubscribe$ = new Subject();

    constructor(
        private planningService: PlanningService,
        private formBuilder: FormBuilder,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}
    ngAfterViewInit() {
        this.planningService.steps$.next(this.steps);
        this.step$.subscribe(( step ) => {
            if ( step != null ) {
                this.loadComponent(this.steps[ step ]);
            }
        })
    }
    ngOnInit() {
        this.initializeSteps();
    }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    initializeSteps() {
        this.steps.push( new Step('Procurar equipamentos', StepState.ACTUAL, SearchEquipmentsComponent) );
        this.steps.push( new Step('Realizar manobras', StepState.NOT_ACTIVATED, ChangeEquipmentsComponent ));
        this.steps.push( new Step('Simular e salvar', StepState.NOT_ACTIVATED, SaveEquipmentsChangesComponent));
    }
//   initializeFormControl() {
//     this.actualForm$.subscribe(( form: FormGroup ) => {
//       if ( form )  {
//         form.statusChanges.subscribe(( status ) => {
//           if ( status === 'VALID' ) {
//               // TODO
//           }
//         })
//       }
//     })
//   }
//   initializeStepper() {
//     // this.steps.push( new Step('Procurar equipamentos', StepState.ACTUAL, SearchEquipmentsComponent) );
//     // this.steps.push( new Step('Realizar manobras', StepState.NOT_ACTIVATED, ChangeEquipmentsComponent ));
//     // this.steps.push( new Step('Simular e salvar', StepState.NOT_ACTIVATED, SaveEquipmentsChangesComponent));
//     // this.stepsSize = this.steps.length;
//     this.initializeStepperEvents();
//   }
//   initializeStepperEvents() {
//     this.eventStepChanged();
//     this.control = this.formBuilder.group({
//       actualFormDone: ['', Validators.required]
//     });
//   }
//   eventStepChanged() {
//   }
    loadComponent( step ) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(step.component);
        let viewContainerRef = this.dynamicHost.viewContainerRef;
        viewContainerRef.clear();
        viewContainerRef.createComponent(componentFactory);
    }
//   setStep( number ) {
//     const step = this.steps[number - 1];
//     this.actualStep = number;
//     this.loadComponent( step );
//   }
//   setActualForm( form ) {
//     let actualForm = this.actualForm$.getValue();
//     if ( !actualForm || !actualForm.invalid ) {
//       this.actualForm$.next( form );
//     }
//   }
}