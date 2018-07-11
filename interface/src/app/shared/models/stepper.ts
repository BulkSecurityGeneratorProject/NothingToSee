import { Component } from "@angular/core";

export enum StepState { NOT_ACTIVATED = -1, ACTUAL = 0, DONE = 1 }

export class Step {
  name;
  state;
  component: Component;
  constructor( name, state, component ) {
    this.name = name;
    this.state =  state;
    this.component = component;
  }
}