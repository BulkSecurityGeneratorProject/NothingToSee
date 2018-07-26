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
  
  equipmentsLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  ready$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
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
    this.subscription.add(this.state.ready$.subscribe((ready) => {
      if (ready) {
        setTimeout(() => {
          this.state.setForm( this.form );
          this.subscription.add(this.equipmentsLoaded$.subscribe((loaded) => {
            if (loaded) {
              this.ready$.next(true);
            }
          }))
        })
      }
    }))
  }
  ngOnInit() {
    this.initializeEquipments();
    this.initializeForms();
    this.dragController = new DragAndDrop(this.dropPlace.nativeElement);
  }
  
  addDroppedAndTestIfIsImcomplete(id, type) {
    if (id) {
      this.dragController.hasANewDrop(this.controllerElements[id + '-' + type])
    } else {
      this.lastDragged = (type === 'target') ? 'source' : 'target';
      return true;
    }
    return false;
  }
  canDrag(type) {
    return this.lastDragged != type;
  }
  completeBoardChange(element: DropElement) {
    this.actualBoardChange.setBoardByType(element.data.board.id, element.type);
    this.actualBoardChange = undefined;
    this.lastDragged = undefined;
  }
  controllerElement(matElement: MatButton, board: Board, type: string) {
    if (!this.controllerElements.has(board.id + '-' + type)) {
      matElement.disableRipple=true;
      let htmlElement = matElement._elementRef.nativeElement;
      let data = {board:board, equipment: Equipment}
      this.controllerElements.add(board.id + '-' + type);
      this.controllerElements[board.id + '-' + type] = new DropElement(htmlElement, type, data, false);
    }
  }
  createBoardChange(element: DropElement) {
    this.actualBoardChange = new BoardChange(element.data.board.id, element.type)
    let formGroup = <FormGroup>this.form.controls['massivePlanning'];
    let value = formGroup.get('boardsChange').value;
    if (!value) {
      value = [];
    } 
    value.push(this.actualBoardChange);
    formGroup.get('boardsChange').setValue(value);
  }
  drag(ev, id: number, type) {
    if (type ) {
      this.dragController.drag(ev, this.controllerElements[id + '-' + type]);
    }
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

    this.removeBoard(actualElement.data.board, actualElement.type);
    this.dragController.drop(ev);
    this.simulationResult = undefined
  }
  equipmentBoards(type) {
    let id = this.massivePlanning[type + 'EquipmentId'];
    let equipmentsFiltered = this.equipments.filter((equipment: Equipment) => { 
      return equipment.id === id;
    });
    if (equipmentsFiltered.length === 1) {
      return [...equipmentsFiltered[0].boards]
    } else if (equipmentsFiltered.length > 1) {
      throw new Error('Mais de um equipamento com o mesmo id.');
    }
  }
  eventEquipmentChanged(type) {
    if (this.needToResetBoardChanges(type)) {
      this.dragController.removeAll();
      this.resetBoardChanges(type);
    }
  }
  eventFormChanges() {
    this.subscription.add(this.form.get('massivePlanning').valueChanges.subscribe((massivePlanning: MassivePlanning) => {
      let old = this.massivePlanning;
      let typeToReset = '';
      this.massivePlanning = massivePlanning;
      if (!old || old.sourceEquipmentId != massivePlanning.sourceEquipmentId) {
        this.updateSourceAndTargetBoards('source');
        typeToReset = 'source';
      }
      if (!old || old.targetEquipmentId != massivePlanning.targetEquipmentId) {
        this.updateSourceAndTargetBoards('target');
        typeToReset = 'target'
      }

      this.controllerElements.forEach((key: string) => {
        if (key.includes(typeToReset)) {
          this.removeControllerElement(key);
        }
      })
    }));
  }
  eventRemoveBoardChange(boardChange: BoardChange) {
    if (boardChange.sourceBoardId) {
      let key = boardChange.sourceBoardId + '-source';
      this.revertDropped(key);
    }
    if (boardChange.targetBoardId) {
      let key = boardChange.targetBoardId + '-target';
      this.revertDropped(key);
    }

    if (this.actualBoardChange === boardChange) {
      this.lastDragged = undefined;
      this.actualBoardChange = undefined;
    }
    let formGroup = <FormGroup>this.form.controls['massivePlanning'];
    let boardChanges = formGroup.get('boardsChange').value
    for (let i = 0; i < boardChanges.length; i++) {
      let board = boardChanges[i];
      if (board === boardChange) {
        boardChanges.splice(i, 1);
        formGroup.get('boardsChange').setValue(boardChanges);
      }
    }
    this.simulationResult = undefined
  }
  eventSave() {
    if (this.validateForm()) {
      super.eventSave();
    }
  }
  eventSimulation() {
    let validationMessage: string = this.validateForm();
    if (validationMessage === '') {
      this.equipmentsChangeService.simulation(this.form.getRawValue()).subscribe((result) => {
        this.simulationResult = [];
        this.loadSimulationErrorModal(EquimentChangeStatusType.VALID_SIMULATION, 'Sucesso na simulação.')
      },(error => {
        this.simulationResult = false;
      }))
    } else {
      this.loadSimulationErrorModal(EquimentChangeStatusType.INVALID_FORM, validationMessage);
    }
  }
  getBoardById(boardId: string, type) {
    let controllerElement: DropElement = this.controllerElements[boardId + '-' + type];
    return controllerElement.data.board;
  }
  initializeForms() {
    if ( !this.form ) {
      this.form = this.formBuilder.group({
        massivePlanning: this.formBuilder.group({
          sourceEquipmentId: [null, Validators.required],
          targetEquipmentId: [null, Validators.required],
          boardsChange: [[]]
        })
      })
    } else {
      this.subscription.add(this.ready$.subscribe((loaded) => {
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
        this.equipments = equipments;
        this.equipmentsLoaded$.next(true);
      });
  }
  needToResetBoardChanges(type) {
    if (type === this.lastDragged) {
      return true;
    }
    else if (this.actualBoardChange && (!this.actualBoardChange.sourceBoardId || !this.actualBoardChange.targetBoardId)) {
      return this.massivePlanning.boardsChange.length > 1;
    } else {
      return true;
    }
  }
  loadSimulationErrorModal(statusType: EquimentChangeStatusType, message: string) {
    this.dialogRef = this.dialog.open(ModalStatus);
    this.dialogRef.componentInstance['statusType'] = statusType;
    this.dialogRef.componentInstance['message'] = message;
    
  }
  removeBoard(board: Board, type) {
    let elements = (type === 'target') ? this.targetEquipmentBoards : this.sourceEquipmentBoards;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i] === board) {
        elements.splice(i, 1);
        return;
      }
    }
  }
  removeControllerElement(key) {
    let controllerElement: DropElement = this.controllerElements[key];
    this.dragController.removeDropElement(controllerElement);
    this.controllerElements.delete(key);
  }
  resetBoardChanges(type) {
    this.actualBoardChange = undefined;
    this.lastDragged = undefined;
    this.simulationResult = undefined;
    let boardChanges = this.massivePlanning.boardsChange;
    for(let boardChange of boardChanges) {
      if (boardChange.sourceBoardId && type !== 'source') {
        let key = boardChange.sourceBoardId + '-source';
        this.revertDropped(key);
      }
      if (boardChange.targetBoardId && type !== 'target') {
        let key = boardChange.targetBoardId + '-target';
        this.revertDropped(key);
      }
    }
    this.form.get('massivePlanning').get('boardsChange').setValue([]);
  }
  revertDropped(key: string) {
    let controllerElement = this.controllerElements[key];
    if (controllerElement.type === 'target') {
      this.targetEquipmentBoards.push(controllerElement.data.board);
    } else if (controllerElement.type === 'source') {
      this.sourceEquipmentBoards.push(controllerElement.data.board);
    }
    this.removeControllerElement(key)
  }
  validateBoardChanges() {
    if (!this.massivePlanning.boardsChange || this.massivePlanning.boardsChange.length === 0) {
      return 'Não há manobras.';
    }
    for (let boardChange of this.massivePlanning.boardsChange) {
      if (!boardChange.sourceBoardId || !boardChange.targetBoardId) {
        return 'Existem manobras imcompletas.'
      }
    }
    return '';
  }
  validateForm() {
    if (this.form.valid) {
      return this.validateBoardChanges();
    } else {
      for (let i in this.form.controls) {
        let massivePlanningFormGroup:FormGroup = <FormGroup>this.form.controls[i];
        for (let j in massivePlanningFormGroup.controls) {
          massivePlanningFormGroup.controls[j].markAsTouched();
        }
      }
      return 'Você precisa selecionar equipamento de origem e destino'+
      '\n e realizar manobras.';
    }
  }
  updateDragAndDrop() {
    let boardChanges = this.massivePlanning.boardsChange;
    
    if (!boardChanges) {
      return;
    }

    for (let boardChange of boardChanges) {
      let imcompleteSource = this.addDroppedAndTestIfIsImcomplete(boardChange.sourceBoardId, 'source');
      let imcompleteTarget = this.addDroppedAndTestIfIsImcomplete(boardChange.targetBoardId, 'target');
      if (imcompleteSource && imcompleteTarget) {
        throw new Error('Uma troca de placa sem origem e sem destino');
      }
      let imcomplete = imcompleteSource || imcompleteTarget;
      if (imcomplete && !this.actualBoardChange) {
          this.actualBoardChange = boardChange;
      } else if(imcomplete) {
        throw new Error('Mais de uma manobras não finalizadas.')
      }
    }
  }
  updateSourceAndTargetBoards(type) {
    let boards = this.equipmentBoards(type);
    if (type === 'source' && boards) {
      this.sourceEquipmentBoards = boards;
    } else if (type === 'target' && boards) {
      this.targetEquipmentBoards = boards;
    }
  }
  updateView() {
    this.massivePlanning = this.form.get('massivePlanning').value;
    this.updateSourceAndTargetBoards('source');
    this.updateSourceAndTargetBoards('target');
    setTimeout(() => {
      this.updateDragAndDrop();
    })
  }
}
