import { AfterViewInit, OnDestroy, OnInit, AfterContentInit, AfterViewChecked } from "@angular/core";
import { StateComponent } from "./state.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";
import { MatDialog, MatDialogRef } from "@angular/material";

export abstract class StepComponent implements OnInit, OnDestroy, AfterContentInit {
    dialog: MatDialog;
    formBuilder: FormBuilder;
    dialogRef: MatDialogRef<any>;
    /*
        the state will be inject by the parent(StateComponent)
    */
    state: StateComponent;
    form: FormGroup;
    lastForm: FormGroup;
    subscription: Subscription = new Subscription();
    
    abstract validateForm();
    constructor() {}
    ngAfterContentInit() {
        this.state.ready$.subscribe((ready) => {
            if ( ready  ) {
                this.state.setForm( this.form );
            }
        })
    }
    ngOnInit() {}
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    initializeForms( fields ) {
        this.form = this.formBuilder.group( fields ); 
    }
    eventBackward() {
        this.state.eventBackward(this.state.actualStep$.getValue() - 1);
    }
    eventSave() {
        this.state.eventForward(this.state.actualStep$.getValue() + 1);
    }
}