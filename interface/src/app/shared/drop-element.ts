import { MatButton } from "@angular/material";

export class DropElement {
  element: HTMLElement;
  parent: HTMLElement;
  grandParent: HTMLElement;
  type: string
  done: boolean = false;
  data: any;
  constructor( element: HTMLElement, type: string, data: any) {
    this.element = element;
    this.parent = this.element.parentElement;
    this.grandParent = this.parent.parentElement;
    this.type = type;
    this.data = data;
  }
  isDone() {
    return this.done;
  }
}