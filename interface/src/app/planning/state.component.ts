import { OnDestroy, OnInit, ComponentFactoryResolver, ViewChild, AfterContentInit } from '@angular/core';
import { DynamicDirective } from '../shared/directive/dynamic.directive';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Step } from '../shared/models/step';
import { PlanningComponent } from './planning.component';

export abstract class StateComponent implements OnInit, OnDestroy, AfterContentInit {
    @ViewChild(DynamicDirective) dynamicHost: DynamicDirective;
    /*
        the State.planningComponent will be inject by the parent(PlanningComponent)
        see in 
    */
    actualStep$: BehaviorSubject<Step> = new BehaviorSubject(null);
    eventSave$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    formEvaluation$: BehaviorSubject<number> = new BehaviorSubject(-1);
    planningComponent: PlanningComponent;
    ready$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    subscriptions: Subscription = new Subscription();

    actualForm: FormGroup;
    steps: Array<Step> = new Array();
    step: Step;
    stepsFormHistory: Set<any> = new Set();
    index: number = -1;

    abstract initializeSteps();
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
    ngOnInit() {
        this.initializeFormEvaluations()
        this.watchStep();
    }
    ngAfterContentInit() {
        this.initializeSteps();
        setTimeout(() => {
            this.ready$.next(true);
        }, 100)
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    initializeFormEvaluations() {
        this.subscriptions.add(this.formEvaluation$.subscribe(( evaluated ) => {
          if ( evaluated === 1) {
            this.eventFormEvaluationDone();
          }
        }))
    }
    eventBackward(index) {
        this.index = index;
        if (  this.index >= 0 ) {
            this.actualStep$.next(this.steps[  this.index ]);
            this.index = null;
        }
    }
    eventFormEvaluationDone() {
        if ( this.index < this.steps.length ) {
            this.actualStep$.next( this.steps[ this.index ] );
            this.index = null;
        }
        this.formEvaluation$.next(-1);
    }
    eventForward(index) {
        this.index = index;
        this.eventSave$.next(true);
    }
    loadStepComponent( step ) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(step.component);
        let viewContainerRef = this.dynamicHost.viewContainerRef;
        viewContainerRef.clear();
        let instance = viewContainerRef.createComponent(componentFactory).instance;
        instance['state'] = this;
        if ( this.stepsFormHistory[ step.number ] ) {
            instance['form'] = this.stepsFormHistory[ step.number ];
        }
    }
    setForm( form: FormGroup ) {
        this.actualForm = form;
        this.stepsFormHistory[ this.step.number ] = this.actualForm;
    }
    setInitialStep( step ) {
        this.actualStep$.next( step );
    }
    watchStep() {
        this.subscriptions.add(this.actualStep$.subscribe(( step ) => {
            if ( step != null ) {
                this.loadStepComponent(step);
                this.step = step;
            }
        }))
    }
}