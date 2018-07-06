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
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-container',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit, OnDestroy {
  selectedIndex: number;
  actualForm: BehaviorSubject<FormGroup> = new BehaviorSubject(null);
  unsubscribe$ = new Subject();
  @ViewChild('stepper') stepper: MatStepper;
  constructor(
    private planningService: PlanningService,
    private renderer: Renderer,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.initializeStepperEvents();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  initializeStepperEvents() {
    this.eventStepChanged();
    // console.log(this.stepper)
  }
  eventStepChanged() {
    this.stepper.selectionChange.subscribe(( newStep ) => {
      let actualForm = this.actualForm.getValue();
      if ( actualForm.invalid ) {
        console.log("?")
        console.log(newStep)

        //this.stepper.previous()
        // newStep.selectedIndex = newStep.previouslySelectedIndex;
        // newStep.selectedStep = newStep.previouslySelectedStep;
      }
    })
  }

  setActualForm( form ) {
    let actualForm = this.actualForm.getValue();
    if ( !actualForm || !actualForm.invalid ) {
      this.actualForm.next( form );
    }
  }
  doSomething(event) {
    console.log(event)
    return false;
    // if (this.checkReturn === false) {
    //     console.log(this.mdStepper.selectedIndex); //index is not yet changed
    //     //do business logic saving
    //     //if business logic saving return to previous page
    //     this.checkReturn = true;
    //     this.mdStepper.selectedIndex = event.previouslySelectedIndex; //not working because index is still the old index
    // }
    // else {
    //     this.checkReturn = false;
    // }
}
}
