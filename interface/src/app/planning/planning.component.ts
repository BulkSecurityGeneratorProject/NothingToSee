import { Component, OnInit, Renderer, OnDestroy, Input, ViewChild  } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanningService } from './planning.service';
import { Subject } from 'rxjs/internal/Subject';
import { ExecutionDiary } from  '../shared/dto/execution-diary';
import { Planning } from  '../shared/dto/planning';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Equipment } from 'src/app/shared/dto/equipment';
import { MatStepper } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

@Component({
  selector: 'app-container',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit, OnDestroy {
  selectedIndex: number;
  steps: Array<Step> = new Array();
  actualForm$: BehaviorSubject<FormGroup> = new BehaviorSubject(null);
  unsubscribe$ = new Subject();
  control: FormGroup;

  actualStep = 1;
  stepsSize;

  constructor(
    private planningService: PlanningService,
    private renderer: Renderer,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.initializeStepper();
    this.initializeFormControl();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  initializeFormControl() {
    this.actualForm$.subscribe(( form: FormGroup ) => {
      if ( form )  {
        form.statusChanges.subscribe(( status ) => {
          console.log(status);
          if ( status === 'VALID' ) {
            
          }
        })
      }
    })
  }
  initializeStepper() {
    this.steps.push( new Step('Procurar equipamentos', StepState.ACTUAL) );
    this.steps.push( new Step('Realizar manobras', StepState.NOT_ACTIVATED) );
    this.steps.push( new Step('Simular e salvar', StepState.NOT_ACTIVATED) );
    this.stepsSize = this.steps.length;
    this.initializeStepperEvents();
  }
  initializeStepperEvents() {
    this.eventStepChanged();
    this.control = this.formBuilder.group({
      actualFormDone: ['', Validators.required]
    });
  }
  eventStepChanged() {
  }

  setActualForm( form ) {
    let actualForm = this.actualForm$.getValue();
    if ( !actualForm || !actualForm.invalid ) {
      this.actualForm$.next( form );
    }
  }
}

enum StepState {
  NOT_ACTIVATED = -1,
  ACTUAL = 0,
  DONE = 1
}

class Step {
  name;
  state;
  constructor( name, state ) {
    this.name = name;
    this.state =  state;
  }
}