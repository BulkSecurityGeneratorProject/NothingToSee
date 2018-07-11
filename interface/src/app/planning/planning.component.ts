import { Component, OnInit, Renderer, OnDestroy, Input, ViewChild, ComponentFactoryResolver,
   ChangeDetectionStrategy,  
   AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanningService } from './planning.service';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { DynamicDirective } from '../shared/directive/dynamic.directive';
import { Step } from '../shared/models/stepper';
import { MassiveComponent } from './index';

@Component({
  selector: 'app-container',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(DynamicDirective) dynamicHost: DynamicDirective;
  
  steps: Array<Step> = null;
  states: Array<any> = [];
  unsubscribe$ = new Subject();
  control: FormGroup;
  actualStep = 0;
  stepsSize;

  constructor(
    private planningService: PlanningService,
    private renderer: Renderer,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  ngOnInit() { 
    this.initializeStates();
    this.loadComponent( this.states[0] )
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeSteps();
    }, 100)
  }
  initializeSteps() {
    this.planningService.steps$.subscribe(( steps ) => {
      if ( steps ) {
        this.steps = steps;
        this.actualStep = 0;
        this.planningService.step$.next( this.actualStep );
        this.stepsSize = this.steps.length;
        this.startFormControl();
      }
    }) 
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  initializeStates() {
    this.states.push( MassiveComponent )
  }
  loadComponent( state ) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(state);
    let viewContainerRef = this.dynamicHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }
  startFormControl() {
    this.control = this.formBuilder.group({
      actualFormDone: ['', Validators.required]
    });
  }
  // initializeFormControl() {
  //   this.actualForm$.subscribe(( form: FormGroup ) => {
  //     if ( form )  {
  //       form.statusChanges.subscribe(( status ) => {
  //         if ( status === 'VALID' ) {
  //             // TODO
  //         }
  //       })
  //     }
  //   })
  // }
  // initializeStepper() {
  //   this.stepsSize = this.steps.length;
  //   this.initializeStepperEvents();
  // }
  // initializeStepperEvents() {
  //   this.eventStepChanged();
  
  // }
  // eventStepChanged() {
  // }
  
  // setStep( number ) {
  //   const step = this.steps[number - 1];
  //   this.actualStep = number;
  //   this.loadComponent( step );
  // }
  // setActualForm( form ) {
  //   let actualForm = this.actualForm$.getValue();
  //   if ( !actualForm || !actualForm.invalid ) {
  //     this.actualForm$.next( form );
  //   }
  // }
}