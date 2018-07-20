import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { StepComponent } from '../../step.component';
import { EquipmentChangeService } from './equipment-change.service';
import { Equipment } from '../../../shared/models/equipment';
import { DragAndDrop, Element } from '../../../shared/directive/dragAndDrop';
import { MassivePlanning, BoardChange } from '../../../shared/models/massivePlanning';
import { Board } from '../../../shared/models/board';
import { ModalError } from './modals/modal-error.component';
import { EquimentChangeErrorType } from './equipment-change-error.enum';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'equipment-change',
  templateUrl: './equipment-change.component.html',
  styleUrls: ['./equipment-change.component.scss']
})
export class EquipmentChangeComponent extends StepComponent {
  @ViewChild('dropPlace') dropPlace: ElementRef;
  
  actualBoardChange: BoardChange;
  dragController: DragAndDrop;
  equipments = [];  
  lastDragged;
  simulationResult: any;
  massivePlanning: MassivePlanning;

  constructor(dialog: MatDialog, formBuilder: FormBuilder, private equipmentsChangeService: EquipmentChangeService) {
    super();
    this.dialog = dialog;
    this.formBuilder = formBuilder;
  }
  ngOnInit() {
    this.initializeForms();
    this.initializeEquipments();
    this.dragController = new DragAndDrop(this.dropPlace.nativeElement);
  }
  ngAfterContentInit() {
    this.state.ready$.subscribe((ready) => {
      if (ready) {
        setTimeout(() => {
          this.state.setForm( this.form );
        })
      }
    })
  }
  canDrag(type) {
    return this.lastDragged != type;
  }
  createBoardChange(element: Element) {
    this.actualBoardChange = new BoardChange(element.data.board, element.type)
    this.massivePlanning.boardsChange.push(this.actualBoardChange);
  }
  completeBoardChange(element: Element) {
    this.actualBoardChange.setBoardByType(element.data.board, element.type);
    this.actualBoardChange = undefined;
    this.lastDragged = undefined;
  }
  drag(ev, type, board:Board, equipment: Equipment) {
    this.dragController.drag(ev, type, {board: board, equipment: equipment});
  }
  dragEnd(ev) {
    this.dragController.dragEnd(ev);
  }
  dropOver(ev) {
    this.dragController.dropOver(ev);
  }
  drop(ev) {
    let actualElement = this.dragController.actualElement;
    if ( this.lastDragged && this.lastDragged !== actualElement.type) {
      this.completeBoardChange(actualElement);
    } else {
      this.createBoardChange(actualElement);
      this.lastDragged = actualElement.type;
    }
    this.dragController.drop(ev);
  }
  equipmentChanged() {
    if (this.haveBoardChangeCompleted()) {
      this.dragController.removeAll();
      this.resetBoardChanges();
    }
  }
  initializeForms() {
    if ( !this.form ) {
      this.form = this.formBuilder.group({
        massivePlanning: this.formBuilder.group({
          sourceEquipment: [null, Validators.required],
          targetEquipment: [null, Validators.required],
          boardsChange: [new Array<BoardChange>(), Validators.required]
        })
      })
      this.onChanges();
    }
  }
  initializeEquipments() {
    this.equipmentsChangeService.getEquipments( this.lastForm.getRawValue() )
      .subscribe(( equipments ) =>  {
        this.equipments = equipments
      });
  }
  haveBoardChangeCompleted() {
    if ( this.actualBoardChange && (!this.actualBoardChange.sourceBoard || !this.actualBoardChange.targetBoard)) {
      return this.massivePlanning.boardsChange.length > 1;
    }
    return this.massivePlanning && this.massivePlanning.boardsChange.length > 0;
  }
  onChanges() {
    this.subscription.add(this.form.get('massivePlanning').valueChanges.subscribe((massivePlanning) => {
      this.massivePlanning = massivePlanning;
    }));
  }
  removeBoardChangesByType( elements, type ) {
    if (!elements) {
      return;
    }
    this.massivePlanning.boardsChange = [];
  }
  removeByType(type) {
    let elements:Array<Element> = this.dragController.elements[type];
    this.removeBoardChangesByType(elements, type);
    this.dragController.removeByType(type);
  }
  resetBoardChanges() {
    this.lastDragged = undefined;
    this.actualBoardChange = undefined;
    this.massivePlanning.boardsChange = [];
  }
  eventSave() {
    if (this.validateForm()) {
    }
  }
  eventSimulation() {
    if (this.validateForm()) {
      this.equipmentsChangeService.simulation(this.form.getRawValue()).subscribe((result) => {
        this.simulationResult = result;
        console.log(result);
      },(error => {
        // this.simulationResult = false;
        console.log(error);
      }))
    } else {
      this.loadSimulationErrorModal(EquimentChangeErrorType.INVALID_FORM);
    }
  }
  loadSimulationErrorModal(errorType: EquimentChangeErrorType) {
    this.dialogRef = this.dialog.open(ModalError);
    this.dialogRef.componentInstance['errorType'] = errorType;
  }
  validateForm() {
    return false;
    // if (this.form.valid && this.simulationResult) {
    //   return true;
    // } else {
    //   for( let i in this.form.controls ) {
    //     this.form.controls[i].markAsTouched();
    //   }
    //   return false;
    // }
  }
}