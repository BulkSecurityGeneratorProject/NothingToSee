import { Component, OnInit, Renderer, OnDestroy, Input, ViewChild  } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { PlanningService } from './planning.service';
import { Subject } from 'rxjs/internal/Subject';
import { ExecutionDiary } from  '../shared/dto/execution-diary';
import { Planning } from  '../shared/dto/planning';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Equipment } from 'src/app/shared/dto/equipment';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-container',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit, OnDestroy {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selectedIndex: number;
  @ViewChild('stepper') stepper: MatStepper;
  constructor( 
    private planningService: PlanningService,
    private renderer: Renderer,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    // this.initializeDiaries();
    // this.watchUrl();

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.stepper.selectionChange.subscribe((x) => {
      console.log( "?")
      console.log(this.stepper);
      this.selectedIndex = x.selectedIndex
    })
  }
  ngOnDestroy(){
    // this.componentDestroyed$.next(true);
    // this.componentDestroyed$.complete();
  }
}
//   executionDiaries = new Set();
//   componentDestroyed$: Subject<boolean> = new Subject();
//   planning: Planning = new Planning();
//   targetEquipmentsCache = new Set();
//   sourceEquipmentsCache = new Set();
//   targetEquipment: Equipment = null;
//   sourceEquipment: Equipment = null;
//   isScheduling: boolean = false;

//   isLinear = false;
  
//   constructor( 
//     private planningService: PlanningService,
//     private renderer: Renderer,
//     private router: Router,
//     private route: ActivatedRoute,
//     private _formBuilder: FormBuilder
//   ) {}

//   ngOnInit() {
//     this.initializeDiaries();
//     this.watchUrl();

//     this.firstFormGroup = this._formBuilder.group({
//       firstCtrl: ['', Validators.required]
//     });
//     this.secondFormGroup = this._formBuilder.group({
//       secondCtrl: ['', Validators.required]
//     });
//   }
//   ngOnDestroy(){
//     this.componentDestroyed$.next(true);
//     this.componentDestroyed$.complete();
//   }
//   initializeDiaries() {
//     this.planningService.getExecutionDiaries().subscribe(( executionDiaries ) => {
//       this.executionDiaries = executionDiaries;
//     })
//   }
//   searchEquipments() {
//     let params = { queryParams: { 
//       executionDiaryId: this.planning.executionDiaryId, 
//       at: this.planning.at, 
//       cnl: this.planning.cnl }
//     }
//     this.router.navigate(['/planning'], params)
//   }
//   scheduled( schedule ) {
//     if ( schedule.trim()  === '' ) {
//       this.planning.schedule = null;
//     } else {
//       this.planning.schedule = schedule.trim();
//     }
//     this.isScheduling = false;
//   }
//   scheduling( element ) {
//     this.isScheduling = true;
//     setTimeout(() => {
//       let onElement = this.renderer.selectRootElement('#schedule');
//       onElement.focus();
//     }, 100);
//   }
//   setEquipments( equipments: any ) {
//     for ( let equipment of equipments.target ) {
//       this.targetEquipmentsCache[ equipment.id ] = equipment;
//     }
//     for ( let equipment of equipments.source ) {
//       this.sourceEquipmentsCache[ equipment.id ] = equipment;
//     }
//     this.planning.equipments = equipments;
//   }
//   setSourceEquipment( id ) {
//     this.sourceEquipment = this.sourceEquipmentsCache[id];
//   }
//   setTargetEquipment( id ) {
//     this.targetEquipment = this.targetEquipmentsCache[id];
//   }
//   watchUrl() {
//     let initial = this.route.snapshot.queryParams;
//     this.planning.at = initial.at;
//     this.planning.cnl = initial.cnl;
//     this.planning.executionDiaryId = ( initial.executionDiaryId ) ? initial.executionDiaryId : '-1';
//     this.route.queryParams.subscribe(params => {
//       if ( params['executionDiaryId'] && params['cnl'] && params['at']) {
//         let request = { executionDiaryId: params['executionDiaryId'], cnl: params['cnl'], at: params['at']}
//         this.planningService.searchEquipments( request ).subscribe((equipments: any ) => {
//           this.setEquipments( equipments );
//         });
//       }
//     });
//   }
// }
