import { Base } from './Base';

export class Pais extends Base {
    nombre: string;

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        nombre: string = ''
    ) {
        super(id, eliminado);
        this.nombre = nombre;
    }
}
