import { Component, OnInit } from "@angular/core";
import { EquimentChangeErrorType } from "../equipment-change-error.enum";

@Component({
    selector: 'modal-error-component',
    templateUrl: 'modal-error.component.html',
    styleUrls: ['modal-error.component.scss']
  })
export class ModalError implements OnInit{
    // injected by father component;
    errorType: EquimentChangeErrorType;
    constructor() {}
    ngOnInit() {}
    isFormError() {
        return this.errorType === EquimentChangeErrorType.INVALID_FORM
    }
}
