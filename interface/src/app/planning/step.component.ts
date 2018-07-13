import { AfterViewInit, OnDestroy, OnInit } from "@angular/core";
import { StateComponent } from "./state.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";

export abstract class StepComponent implements OnInit, OnDestroy, AfterViewInit {
    /*
        the State.planningComponent will be inject by the parent(PlanningComponent)
        see in 
    */
    state: StateComponent;
    form: FormGroup;
    lastForm: FormGroup;
    subscription: Subscription = new Subscription();
    
    abstract save();
    abstract validateForm();
    constructor(private formBuilder: FormBuilder) {}
    ngAfterViewInit() {
        this.state.ready$.subscribe((ready) => {
                if ( ready  ) {
                    this.state.setForm( this.form );
                }
            })
    }
    ngOnInit() {
        this.initializeEventSave();
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    initializeForms( fields ) {
        this.form = this.formBuilder.group( fields ); 
    }
    initializeEventSave() {
        this.subscription = this.state.eventSave$.subscribe(( save ) => {
          if ( save ) {
            this.validateForm();
            this.state.eventSave$.next(false);
          }
        })
    }
    eventStepEvaluationDone( status ) {
        this.state.formEvaluation$.next(status);
    }
}