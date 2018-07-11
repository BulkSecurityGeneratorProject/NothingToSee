import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatStepper } from '@angular/material';
import { PlanningService } from '../../planning.service'

@Component({
  selector: 'save-equipments-changes',
  templateUrl: './save-equipments-changes.component.html',
  styleUrls: ['./save-equipments-changes.component.scss']
})
export class SaveEquipmentsChangesComponent implements OnInit, OnDestroy {
  saveEquipmentsChanges: FormGroup;
  @ViewChild('stepper') stepper: MatStepper;
  unsubscribe$ = new Subject();
  constructor(
    private planningService: PlanningService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.saveEquipmentsChanges = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  navigate() {}
}
