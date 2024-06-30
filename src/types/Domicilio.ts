import { Base } from './Base';

import { Cliente } from './Cliente';
import { Localidad } from './Localidad';

export class Domicilio extends Base {
    calle: string;
    numero: number;
    cp: number;
    piso: number;
    nroDpto: number;
    localidad: Localidad;
    clientes?: Cliente[];

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        calle: string = '',
        numero: number = 0,
        cp: number = 0,
        piso: number = 0,
        nroDpto: number = 0,
        localidad: Localidad = new Localidad(),
        clientes: Cliente[] = []
    ) {
        super(id, eliminado);
        this.calle = calle;
        this.numero = numero;
        this.cp = cp;
        this.piso = piso;
        this.nroDpto = nroDpto;
        this.localidad = localidad;
        this.clientes = clientes;
    }
}
