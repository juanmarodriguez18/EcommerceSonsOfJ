import { Base } from './Base';
import { Articulo } from './Articulo';

export class PedidoDetalle extends Base {
    cantidad: number;
    subTotal: number;
    articulo: Articulo;

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        cantidad: number = 0,
        subTotal: number = 0,
        articulo: Articulo // No se inicializa a null para evitar problemas de tipo
    ) {
        super(id, eliminado);
        this.cantidad = cantidad;
        this.subTotal = subTotal;
        this.articulo = articulo;
    }
}
