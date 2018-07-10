import { Board } from './board';

export class Equipment {
    name: string;
    id: string;
    boards: Array<Board>;
    constructor( name: string, id: string, boards: Array<Board> ) {
        this.name = name;
        this.id = id;
        this.boards = boards;
    }
}