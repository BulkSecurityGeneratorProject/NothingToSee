import { Port } from "./port";

export class Board {
    id: string;
    name: string;
    ports: Array<Port>;
    constructor( name: string, ports: Array<Port>, id: string ) {
        this.name = name;
        this.ports = ports;
        this.id = id;
    }
}