import { Equipment } from "./equipment";
import { Board } from "./board";

export class MassivePlanning {
    sourceEquipment: Equipment;
    targetEquipment: Equipment;
    boardsChange: Array<BoardChange>;
    constructor(sourceEquipment, targetEquipment, boardsChange) {
        this.sourceEquipment = sourceEquipment;
        this.targetEquipment = targetEquipment;
        this.boardsChange = boardsChange;;
    }
}
// Etender como a manobra vai ser efetuada para passar de modo correto por meio do DTO
// Exemplo: Porta 1 da board X vai ser alocada na porta 2 da board Y, vai haver validação de ocupação ou algo do gênero ?
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