import { Base } from './Base';
import { ArticuloInsumo } from './ArticuloInsumo';

export class ArticuloManufacturadoDetalle extends Base {
    cantidad: number;
    articuloInsumo: ArticuloInsumo;

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        cantidad: number = 0,
        articuloInsumo: ArticuloInsumo
    ) {
        super(id, eliminado);
        this.cantidad = cantidad;
        this.articuloInsumo = articuloInsumo;
    }
}
