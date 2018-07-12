import { OnDestroy, OnInit, ComponentFactoryResolver, ViewChild, AfterContentInit } from '@angular/core';
import { DynamicDirective } from '../shared/directive/dynamic.directive';
import { Subject, BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Step } from '../shared/models/step';
import { PlanningComponent } from './planning.component';

export class State implements OnInit, OnDestroy, AfterContentInit {
    @ViewChild(DynamicDirective) dynamicHost: DynamicDirective;
    /*
        the State.planningComponent will be inject by the parent(PlanningComponent)
        see in 
    */
    planningComponent: PlanningComponent;
    unsubscribe$ = new Subject();

    steps: Array<Step> = new Array();
    step: Step;
    actualForm: FormGroup;
    ready$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
    ngAfterContentInit() {
        this.planningComponent.ready$.subscribe(( isReady ) => {
            if ( isReady ) {
                this.initializeSteps();
                setTimeout(() => {
                    this.ready$.next(true);
                }, 100)
            }
        })
    }
    ngOnInit() {};
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    initializeSteps() {}
    loadStepComponent( step ) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(step.component);
        let viewContainerRef = this.dynamicHost.viewContainerRef;
        viewContainerRef.clear();
        let instance = viewContainerRef.createComponent(componentFactory).instance;
        instance['state'] = this;
    }
    setForm( form: FormGroup ) {
        this.actualForm = form;
        this.planningComponent.control = this.actualForm;
    }
    setInitialStep( step ) {
        this.planningComponent.actualStep$.next( step );
        this.watchStep();
    }
    setSteps() {
        this.planningComponent.steps = this.steps;
    }
    watchStep() {
        this.planningComponent.actualStep$.subscribe(( step ) => {
            if ( step != null ) {
                this.loadStepComponent(step);
            }
        })
    }
}