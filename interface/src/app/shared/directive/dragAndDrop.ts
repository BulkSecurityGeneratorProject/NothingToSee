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
  hasANewDrop(element: DropElement) {
    element.grandParent.removeChild(element.parent);
    element.element.setAttribute('draggable', 'false');
    this.dropPlace.appendChild( element.element );
    this.elements.add(element);
    
    let group = this.elements[element.type];
    if (!group) {
      group = this.elements[element.type] = [];
    }

    this.elements[element.type] = group = [...group, element];
    element.done = true;
  }
  removeByType( type ) {
    let group = this.elements[type];

    if (!group) {
      return;
    }

    for(let i = 0; i < group.length; i++) {
      let dragged = group[i];
      this.dropPlace.removeChild( dragged.element );
      dragged.parent.appendChild( dragged.element );
      dragged.grandParent.appendChild( dragged.parent );
      this.elements.delete(dragged);
      group.splice(i, 1);
      i--;
    }
    
  }
  removeAll() {
    this.elements.forEach((dragged) => {
        this.dropPlace.removeChild( dragged.element )
        dragged.parent.appendChild( dragged.element );
        dragged.grandParent.appendChild( dragged.parent );
        this.elements.delete(dragged);
    })

    for(let key in this.elements) {
      delete this.elements[key];
    }
  }
}