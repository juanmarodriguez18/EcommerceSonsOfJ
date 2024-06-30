import { Base } from './Base';
import { Pais } from './Pais';

export class Provincia extends Base {
    nombre: string;
    pais: Pais;

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        nombre: string = '',
        pais: Pais = new Pais(),
    ) {
        super(id, eliminado);
        this.nombre = nombre;
        this.pais = pais;
    }
}
