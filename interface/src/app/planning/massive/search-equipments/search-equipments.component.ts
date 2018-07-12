import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PlanningService } from '../../planning.service'
import { BehaviorSubject } from 'rxjs';
import { State } from '../../state';
import { PlanningComponent } from '../../planning.component';

@Component({
  selector: 'search-equipments',
  templateUrl: './search-equipments.component.html',
  styleUrls: ['./search-equipments.component.scss']
})
export class SearchEquipmentsComponent implements OnInit, OnDestroy, AfterViewInit {
  /*
    the State.planningComponent will be inject by the parent(PlanningComponent)
    see in 
  */
  state: State;
  unsubscribe$ = new Subject();
  searchEquipments: FormGroup;
  
  executionDiaries = [];

  constructor( private formBuilder: FormBuilder ) {}

  ngAfterViewInit() {
    this.state.ready$.subscribe((ready) => {
      if ( ready  ) {
        this.state.setForm( this.searchEquipments );
      }
    })
  }
  ngOnInit() {
    this.initializeForms();
    this.initializeEventSave();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  initializeForms() {
    this.searchEquipments = this.formBuilder.group({
      executionDiaryId: ['-1', Validators.required],
      cnl: ['', Validators.required],
      at: ['', Validators.required]
    });
  }
  initializeEventSave() {
    this.state.planningComponent.eventSave$.subscribe(( save ) => {
      if ( save ) {
        this.validateForm();
        this.state.planningComponent.eventSave$.next(false);
      }
    })
  }
  validateForm() {
    if ( this.searchEquipments.valid ) {
      this.state.planningComponent.formEvaluation$.next(1);
    }
  }
}
