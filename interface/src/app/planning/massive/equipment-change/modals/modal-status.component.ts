import { Component, OnInit } from "@angular/core";
import { EquimentChangeStatusType } from "../equipment-change-status.enum";

@Component({
    selector: 'modal-status-component',
    templateUrl: 'modal-status.component.html',
    styleUrls: ['modal-status.component.scss']
  })
export class ModalStatus implements OnInit{
    // injected by father component;
    statusType: EquimentChangeStatusType;
    message: string;
    constructor() {}
    ngOnInit() {}
    isFormError() {
        return this.statusType === EquimentChangeStatusType.INVALID_FORM
    }
    isFormSuccess() {
        return this.statusType === EquimentChangeStatusType.VALID_SIMULATION
    }
}
