import { Equipment } from "./equipment";
import { Board } from "./board";

export class MassivePlanning {
    sourceEquipmentId: string;
    targetEquipmentId: string;
    boardsChange: Array<BoardChange>;
    constructor(sourceEquipmentId, targetEquipmentId, boardsChange) {
        this.sourceEquipmentId = sourceEquipmentId;
        this.targetEquipmentId = targetEquipmentId;
        this.boardsChange = boardsChange;
    }
}

export class BoardChange {
    sourceBoardId: string;
    targetBoardId: string;
    constructor( board, type ) {
        if ( type === 'target' ) {
            this.targetBoardId = board;
        } else {
            this.sourceBoardId = board;
        }
    }
    setBoardByType(board, type) {
        if ( type === 'target' ) {
            this.targetBoardId = board;
        } else {
            this.sourceBoardId = board;
        }
    }
}