import { Equipment } from "./equipment";
import { Board } from "./board";

export class MassivePlanning {
    sourceEquipment: Equipment;
    targetEquipment: Equipment;
    boardsChange: Array<BoardChange>;
    constructor(sourceEquipment, targetEquipment, boardsChange) {
        this.sourceEquipment = sourceEquipment;
        this.targetEquipment = targetEquipment;
        this.boardsChange = boardsChange;
    }
}

export class BoardChange {
    sourceBoard: Board;
    targetBoard: Board;
    constructor( board, type ) {
        if ( type === 'target' ) {
            this.targetBoard = board;
        } else {
            this.sourceBoard = board;
        }
    }
    setBoardByType(board, type) {
        if ( type === 'target' ) {
            this.targetBoard = board;
        } else {
            this.sourceBoard = board;
        }
    }
}