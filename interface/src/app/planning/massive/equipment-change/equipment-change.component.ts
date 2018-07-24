import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms'
import { StepComponent } from '../../step.component';
import { EquipmentChangeService } from './equipment-change.service';
import { Equipment } from '../../../shared/models/equipment';
import { DragAndDrop } from '../../../shared/directive/dragAndDrop';
import { MassivePlanning, BoardChange } from '../../../shared/models/massivePlanning';
import { Board } from '../../../shared/models/board';
import { ModalStatus } from './modals/modal-status.component';
import { EquimentChangeStatusType } from './equipment-change-status.enum';
import { MatDialog, MatSelect, MatButton } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { DropElement } from '../../../shared/drop-element';

/*
  Considerar usar cache para não buscar coisas novamente e ter que buscar tudo novamente.
*/

@Component({
  selector: 'equipment-change',
  templateUrl: './equipment-change.component.html',
  styleUrls: ['./equipment-change.component.scss']
})
export class EquipmentChangeComponent extends StepComponent {
  @ViewChild('dropPlace') dropPlace: ElementRef;
  @ViewChild('targetSelector') targetSelector: MatSelect;
  
  equipmentesLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  actualBoardChange: BoardChange;
  controllerElements: Set<any> = new Set();
  dragController: DragAndDrop;
  equipments = [];  
  sourceEquipmentBoards: Array<Board> = [];
  targetEquipmentBoards: Array<Board> = [];
  massivePlanning: MassivePlanning;
  lastDragged;
  simulationResult: any;

  constructor(dialog: MatDialog, formBuilder: FormBuilder, private equipmentsChangeService: EquipmentChangeService) {
    super();
    this.dialog = dialog;
    this.formBuilder = formBuilder;
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
  ngOnInit() {
    this.initializeForms();
    this.initializeEquipments();
    this.dragController = new DragAndDrop(this.dropPlace.nativeElement);
  }
  
  canDrag(type) {
    return this.lastDragged != type;
  }
  completeBoardChange(element: DropElement) {
    this.actualBoardChange.setBoardByType(element.data.board, element.type);
    this.actualBoardChange = undefined;
    this.lastDragged = undefined;
  }
  controllerElement(matElement: MatButton, board: Board, type: string) {
    let htmlElement = matElement._elementRef.nativeElement;
    let data = {board:board, equipment: Equipment}
    this.controllerElements.add(board.id + '-' + type);
    this.controllerElements[board.id + '-' + type] = new DropElement(htmlElement, type, data);
  }
  createBoardChange(element: DropElement) {
    this.actualBoardChange = new BoardChange(element.data.board, element.type)
    let formGroup = <FormGroup>this.form.controls['massivePlanning'];
    let value = formGroup.get('boardsChange').value;
    if (!value) {
      value = [];
      formGroup.get('boardsChange').setValue(value);
    } 
    value.push(this.actualBoardChange);
  }
  drag(ev, id: number, type) {
    this.dragController.drag(ev, this.controllerElements[id + '-' + type]);
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
  equipmentBoards(type) {
    let id = this.massivePlanning[type + 'EquipmentId'];
    let equipmentsFiltered = this.equipments.filter((equipment: Equipment) => { 
      return equipment.id === id;
    });
    if (equipmentsFiltered.length === 1) {
      return equipmentsFiltered[0].boards
    } else if (equipmentsFiltered.length > 1) {
      throw new Error('Mais de um equipamento com o mesmo id.');
    }
  }
  equipmentChanged() {
    if (this.haveBoardChangeCompleted()) {
      this.dragController.removeAll();
      this.resetBoardChanges();
    }
  }
  eventFormChanges() {
    this.subscription.add(this.form.get('massivePlanning').valueChanges.subscribe((massivePlanning) => {
      this.massivePlanning = massivePlanning;
      this.sourceEquipmentBoards = this.equipmentBoards('source');
      this.targetEquipmentBoards = this.equipmentBoards('target');
    }));
  }
  eventSave() {
    if (this.validateForm()) {
      super.eventSave();
    }
  }
  eventSimulation() {
    if (this.validateForm()) {
      this.equipmentsChangeService.simulation(this.form.getRawValue()).subscribe((result) => {
        this.simulationResult = [];
        this.loadSimulationErrorModal(EquimentChangeStatusType.VALID_SIMULATION)
      },(error => {
        this.simulationResult = false;
      }))
    } else {
      this.loadSimulationErrorModal(EquimentChangeStatusType.INVALID_FORM);
    }
  }
  getBoardById(id: string, type) {
    let boards;
    if ( type === 'target' ) {
      boards = this.targetEquipmentBoards.filter((board: Board) => {
        return board.id === id;
      })
    } else if (type === 'source') {
      boards = this.targetEquipmentBoards.filter((board: Board) => {
        return board.id === id;
      })
    } else {
      throw new Error('Tipo de placa não encontrada.');
    }
    if (boards.length === 1) {
      return boards[0];
    } else {
      throw new Error('Mais de uma board com o mesmo id');
    }
  }
  initializeForms() {
    if ( !this.form ) {
      this.form = this.formBuilder.group({
        massivePlanning: this.formBuilder.group({
          sourceEquipmentId: [null, Validators.required],
          targetEquipmentId: [null, Validators.required],
          boardsChange: []
        })
      })
    } else {
      this.subscription.add(this.equipmentesLoaded$.subscribe((loaded) => {
        if (loaded) {
          this.updateView();
        }
      }))
    }
    this.eventFormChanges();
  }
  initializeEquipments() {
    this.equipmentsChangeService.getEquipments( this.lastForm.getRawValue() )
      .subscribe((equipments) =>  {
        this.equipments = equipments
        this.equipmentesLoaded$.next(true);
      });
  }
  haveBoardChangeCompleted() {
    if (this.actualBoardChange && (!this.actualBoardChange.sourceBoardId || !this.actualBoardChange.targetBoardId)) {
      return this.massivePlanning.boardsChange.length > 1;
    }
    return this.massivePlanning && this.massivePlanning.boardsChange && this.massivePlanning.boardsChange.length > 0;
  }
  loadSimulationErrorModal(statusType: EquimentChangeStatusType) {
    this.dialogRef = this.dialog.open(ModalStatus);
    this.dialogRef.componentInstance['statusType'] = statusType;
  }
  resetBoardChanges() {
    this.actualBoardChange = undefined;
    this.controllerElements.clear();
    this.lastDragged = undefined;
    this.form.get('massivePlanning').get('boardsChange').setValue([]);
    this.simulationResult = undefined;
  }
  validateForm() {
    if (this.form.valid && this.massivePlanning.boardsChange.length > 0) {
      return true;
    } else {
      for (let i in this.form.controls) {
        let massivePlanningFormGroup:FormGroup = <FormGroup>this.form.controls[i];
        for (let j in massivePlanningFormGroup.controls) {
          massivePlanningFormGroup.controls[j].markAsTouched();
        }
      }
      return false;
    }
  }
  updateView() {
    this.massivePlanning = this.form.get('massivePlanning').value;
    this.sourceEquipmentBoards = this.equipmentBoards('source');
    this.targetEquipmentBoards = this.equipmentBoards('target');
    
  }
}
