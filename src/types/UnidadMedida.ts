import { Base } from './Base';

export class UnidadMedida extends Base {
    denominacion: string;

    constructor(id: number = 0, eliminado: boolean = false, denominacion: string = '') {
        super(id, eliminado);
        this.denominacion = denominacion;
    }
}
