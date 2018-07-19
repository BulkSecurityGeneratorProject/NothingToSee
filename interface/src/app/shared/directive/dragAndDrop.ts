export class DragAndDrop {
    elements: Set<Element> = new Set();
    actualElement: Element;
    constructor( private dropPlace: HTMLElement ) {}
  
    drag(ev, type, data) {
      let sourceElement: HTMLElement = ev.srcElement;
      this.actualElement = new Element(sourceElement, type, data);
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
  
  export class Element {
    element: HTMLElement;
    parent: HTMLElement;
    grandParent: HTMLElement;
    type: string
    done: boolean = false;
    data: any;
    constructor( element: HTMLElement, type: string, data: any) {
      this.element = element;
      this.parent = element.parentElement;
      this.grandParent = this.parent.parentElement;
      this.type = type;
      this.data = data;
    }
    isDone() {
      return this.done;
    }
  }