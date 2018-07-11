import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatStepper } from '@angular/material';
import { PlanningService } from '../../planning.service'

@Component({
  selector: 'change-equipments',
  templateUrl: './change-equipments.component.html',
  styleUrls: ['./change-equipments.component.scss']
})
export class ChangeEquipmentsComponent implements OnInit, OnDestroy {
  changeEquipments: FormGroup;
  @ViewChild('stepper') stepper: MatStepper;
  unsubscribe$ = new Subject();
  constructor(
    private planningService: PlanningService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.changeEquipments = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  navigate() {}
}
