import { Component } from "@angular/core";

export enum Status { NOT_ACTIVATED = -1, ACTUAL = 0, DONE = 1 }

export class Step {
  name: string;
  component: Component;
  number: number;
  status: Status;
  constructor( name, status, component, number) {
    this.name = name;
    this.status =  status;
    this.component = component;
    this.number = number;
  }
}