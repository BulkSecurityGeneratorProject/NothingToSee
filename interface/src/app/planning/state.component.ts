import { OnDestroy, OnInit, ComponentFactoryResolver, ViewChild, AfterContentInit } from '@angular/core';
import { DynamicDirective } from '../shared/directive/dynamic.directive';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Step } from '../shared/models/step';
import { PlanningComponent } from './planning.component';
import { MatStepper } from '@angular/material';

export abstract class StateComponent implements OnInit, OnDestroy, AfterContentInit {
    @ViewChild(DynamicDirective) dynamicHost: DynamicDirective;
    /*
    the State.planningComponent will be inject by the parent(PlanningComponent)
    see in 
    */
    planningComponent: PlanningComponent;

    actualStep$: BehaviorSubject<number> = new BehaviorSubject(null);
    ready$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    subscriptions: Subscription = new Subscription();

    actualForm: FormGroup;
    steps: Array<Step> = new Array();
    step: Step;
    stepsFormHistory: Set<any> = new Set();

    abstract initializeSteps();
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
    ngOnInit() {
        this.watchStep();
    }
    ngAfterContentInit() {
        this.initializeSteps();
        setTimeout(() => {
            this.ready$.next(true);
        })
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
    eventBackward(index:number) {
        this.actualStep$.next(index);
    }
    eventForward(index: number) {
        this.actualStep$.next(index);
    }
    loadStepComponent(step) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(step.component);
        let viewContainerRef = this.dynamicHost.viewContainerRef;
        viewContainerRef.clear();
        let instance = viewContainerRef.createComponent(componentFactory).instance;
        instance['state'] = this;
        if (step.number -1 >= 0) 
            instance['lastForm'] = this.stepsFormHistory[step.number -1];
        if (this.stepsFormHistory[ step.number ]) {
            instance['form'] = this.stepsFormHistory[step.number];
            this.setForm(this.stepsFormHistory[step.number]);
        }
    }
    setForm( form: FormGroup ) {
        this.actualForm = form;
        this.stepsFormHistory[ this.step.number ] = this.actualForm;
    }
    setInitialStep(index: number) {
        this.actualStep$.next(index);
    }
    watchStep() {
        this.subscriptions.add(this.actualStep$.subscribe(( index ) => {
            if (index != null) {
                this.step = this.steps[index]
                this.loadStepComponent(this.step);
            }
        }))
    }
}