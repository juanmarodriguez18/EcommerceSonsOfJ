import { Base } from './Base';
import { Articulo } from './Articulo';

export class PromocionDetalle extends Base {
    cantidad: number;
    articulo: Articulo;

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        cantidad: number = 0,
        articulo: Articulo
    ) {
        super(id, eliminado);
        this.cantidad = cantidad;
        this.articulo = articulo;
    }
}
