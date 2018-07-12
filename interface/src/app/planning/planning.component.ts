import { Component, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver, AfterContentInit} from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DynamicDirective } from '../shared/directive/dynamic.directive';
import { Step } from '../shared/models/step';
import { MassiveComponent } from '.';
import { MatStepper } from '@angular/material';
import { FormGroup } from '../../../node_modules/@angular/forms';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild(DynamicDirective) dynamicHost: DynamicDirective;
  @ViewChild('stepper') stepper: MatStepper;
  states: Array<any> = [];
  unsubscribe$ = new Subject();
  control: FormGroup;
  
  actualStep$: BehaviorSubject<Step> = new BehaviorSubject(null);
  eventSave$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  formEvaluation$: BehaviorSubject<number> = new BehaviorSubject(-1);
  ready$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  steps: Array<Step> = []

  constructor ( private componentFactoryResolver: ComponentFactoryResolver ) {}
  ngAfterContentInit() {
    setTimeout(() => {
      this.ready$.next(true);
    }, 100)
  }
  ngOnInit() { 
    this.initializeStates();
    this.initializeFormEvaluations()
    // Para ser uma rota
    this.loadComponent( this.states[0] )
  }
  initializeStates() {
    this.states.push( MassiveComponent )
  }
  initializeFormEvaluations() {
    this.formEvaluation$.subscribe(( evaluated ) => {
      if ( evaluated === 1) {
        console.log("//")
        let actualStep = this.actualStep$.getValue();
        this.actualStep$.next(this.steps[ actualStep.number + 1 ]);
        this.stepper.next();
        this.formEvaluation$.next(-1);
      }
    })
  }
  eventBackward() {
    this.stepper.previous();
    let actualStep = this.actualStep$.getValue();
    this.actualStep$.next(this.steps[ actualStep.number - 1 ]);
  }
  eventForward() {
    this.eventSave$.next(true);
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  loadComponent( state ) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(state);
    let viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.clear();
    let instance = viewContainerRef.createComponent(componentFactory).instance;
    instance['planningComponent'] = this;
  }
}