import { DropElement } from "../drop-element";

export class DragAndDrop {
  actualElement: DropElement;
  elements: Set<DropElement> = new Set();
  constructor( private dropPlace: HTMLElement ) {}

  drag(ev, element) {
    this.actualElement = element;
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

    this.hasANewDrop(this.actualElement);
    this.actualElement = undefined;
    
    ev.stopPropagation();
    ev.preventDefault();
  }
  hasANewDrop(dragged: DropElement) {
    dragged.grandParent.removeChild(dragged.parent);

    if (dragged.toInsert) {
      dragged.element.setAttribute('draggable', 'false');
      this.dropPlace.appendChild( dragged.element );
    } else {
      dragged.element.remove();
      dragged.parent.remove();
    }
    this.elements.add(dragged);
    
    let group = this.elements[dragged.type];
    if (!group) {
      group = this.elements[dragged.type] = [];
    }

    dragged.done = true;
  }
  removeAll() {
    this.elements.forEach((dragged) => {
      if (dragged.toInsert) {
        this.dropPlace.removeChild( dragged.element )
        dragged.parent.appendChild( dragged.element );
        dragged.grandParent.appendChild( dragged.parent );
        dragged.element.setAttribute('draggable', 'true');
      }
      this.elements.delete(dragged);
    })
  }
  removeDropElement(dragged: DropElement) {
    if (dragged.toInsert) {
      this.dropPlace.removeChild( dragged.element )
      dragged.parent.appendChild( dragged.element );
      dragged.grandParent.appendChild( dragged.parent );
      dragged.element.setAttribute('draggable', 'true');
    }
    this.elements.delete(dragged);
  }
}