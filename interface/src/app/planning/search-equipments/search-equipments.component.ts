import { Component, OnInit, OnDestroy, ViewChild, Optional } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatStepper } from '@angular/material';
import { PlanningService } from '../planning.service'
import { PlanningComponent } from '../planning.component';

@Component({
  selector: 'search-equipments',
  templateUrl: './search-equipments.component.html',
  styleUrls: ['./search-equipments.component.scss']
})
export class SearchEquipmentsComponent implements OnInit, OnDestroy {
  searchEquipments: FormGroup;
  executionDiaries = [];
  @ViewChild('stepper') stepper: MatStepper;
  unsubscribe$ = new Subject();
  constructor(
    private planningService: PlanningService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    @Optional() public planningComponent: PlanningComponent
  ) {}

  ngOnInit() {
    this.initializeDiaries();
    this.initializeForms();
    this.planningComponent.setActualForm( this.searchEquipments );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeDiaries() {
    this.planningService.getExecutionDiaries().subscribe(( executionDiaries ) =>  {
      this.executionDiaries = executionDiaries;
    });
  }
  initializeForms() {
    this.searchEquipments = this.formBuilder.group({
      executionDiaryId: ['-1', Validators.required],
      cnl: ['', Validators.required],
      at: ['', Validators.required]
    });
  }
  navigate() {}
}
