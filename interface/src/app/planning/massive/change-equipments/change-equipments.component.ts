import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { StepComponent } from '../../step.component';
import { ChangeEquipmentsService } from './change-equipments.service';
import { Equipment } from '../../../shared/models/equipment';
import { group } from '../../../../../node_modules/@angular/animations';

@Component({
  selector: 'change-equipments',
  templateUrl: './change-equipments.component.html',
  styleUrls: ['./change-equipments.component.scss']
})
export class ChangeEquipmentsComponent extends StepComponent {
  @ViewChild('dropPlace') dropPlace: ElementRef;
  @ViewChild('dragPlace') dragPlace: ElementRef;
  equipments = [];
  sourceEquipment: Equipment;
  targetEquipment: Equipment;
  dragController: DragAndDrop;
  lastDragged ;

  constructor( formBuilder: FormBuilder, private changeEquipmentsService: ChangeEquipmentsService ) {
    super( formBuilder );
  }
  ngOnInit() {
    this.initializeForms();
    this.initializeEquipments();
    this.onChanges();
    this.dragController = new DragAndDrop(this.dropPlace.nativeElement, this.dragPlace.nativeElement);
    super.ngOnInit();
  }
  canDrag(type) {
    return this.lastDragged != type;
  }
  drag(ev, type) {
    this.dragController.drag(ev, type);
  }
  dragEnd(ev) {
    this.dragController.dragEnd(ev);
  }
  dropOver(ev) {
    this.dragController.dropOver(ev);
  }
  drop(ev) {
    let actualElementType = this.dragController.actualElement.type;
    if ( this.lastDragged && this.lastDragged !== actualElementType) {
      this.lastDragged = undefined;
    } else {
      this.lastDragged = actualElementType;
    }
    this.dragController.drop(ev);
  }
  initializeForms() {
    if ( !this.form ) {
      const formFields = {
        sourceEquipment: [null, Validators.required],
        targetEquipment: [null, Validators.required],
      }
      super.initializeForms( formFields );
    }
  }
  initializeEquipments() {
    this.changeEquipmentsService.getEquipments( this.lastForm.getRawValue() )
      .subscribe(( equipments ) =>  {
        this.equipments = equipments
      });
  }
  onChanges() {
    this.form.get('sourceEquipment').valueChanges.subscribe(val => {
      this.sourceEquipment = val;
    });
    this.form.get('targetEquipment').valueChanges.subscribe(val => {
      this.targetEquipment = val;
    });
  }
  removeByType(type) {
    this.dragController.removeByType(type);
  }
  save() {}
  validateForm() {
    if ( this.form.valid) {
      this.eventStepEvaluationDone(1);
    } else {
      for( let i in this.form.controls ) {
        this.form.controls[i].markAsTouched();
      }
      this.eventStepEvaluationDone(0);
    }
  }
}

class DragAndDrop {
  elements: Set<Element> = new Set();
  actualElement: Element;
  constructor( private dropPlace: HTMLElement, private dragPlace: HTMLElement ) {}

  drag(ev, type) {
    let sourceElement: HTMLElement = ev.srcElement;
    this.actualElement = new Element(sourceElement, type);
    ev.stopPropagation();
    ev.preventDefault();
  }
  dragEnd(ev) {
    if ( this.actualElement && !this.actualElement.isDone() ) {
      this.actualElement = undefined;
    }
  }
  dropOver(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  drop(ev) {
    if ( !this.actualElement ) {
      return;
    }

    this.actualElement.grandParent.removeChild(this.actualElement.parent);
    this.actualElement.element.setAttribute('draggable', 'false');
    this.dropPlace.appendChild( this.actualElement.element );
    this.elements.add(this.actualElement);
    
    let group = this.elements[this.actualElement.type];
    if (!group) {
      group = this.elements[this.actualElement.type] = [];
    }

    this.elements[this.actualElement.type] = group = [...group, this.actualElement];
    this.actualElement.done = true;
    this.actualElement = undefined;
    ev.stopPropagation();
    ev.preventDefault();
  }
  removeByType( type ) {
    let group = this.elements[type];

    if (!group) {
      return;
    }

    for(let i = 0; i < group.length; i++) {
      let dragged = group[i];
      this.dropPlace.removeChild( dragged.element );
      dragged.grandParent.appendChild( dragged.parent );
      this.elements.delete(dragged);
      group.splice(i, 1);
      i--;
    }
    
  }
  removeAll() {
    this.elements.forEach((dragged) => {
        this.dropPlace.removeChild( dragged.element )
        dragged.grandParent.appendChild( dragged.parent );
        this.elements.delete(dragged);
    })
  }
}

class Element {
  element: HTMLElement;
  parent: HTMLElement;
  grandParent: HTMLElement;
  type: string
  done: boolean = false;
  constructor( element: HTMLElement, type: string) {
    this.element = element;
    this.parent = element.parentElement;
    this.grandParent = this.parent.parentElement;
    this.type = type;
  }
  isDone() {
    return this.done;
  }
}