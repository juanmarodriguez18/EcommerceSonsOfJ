import { Base } from './Base';
import { Categoria } from './Categoria';
import { ImagenArticulo } from './ImagenArticulo';
import { UnidadMedida } from './UnidadMedida';

// Definición de la clase Articulo extendiendo de Base
export class Articulo extends Base {
    public denominacion: string;
    public precioVenta: number;
    public imagenesArticulo: Set<ImagenArticulo>;
    public unidadMedida: UnidadMedida;
    public categoria: Categoria;

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        denominacion: string = '',
        precioVenta: number = 0.0,
        imagenesArticulo: Set<ImagenArticulo> = new Set(),
        unidadMedida: UnidadMedida = new UnidadMedida(),
        categoria: Categoria =  new Categoria(),
    ) {
        super(id, eliminado);
        this.denominacion = denominacion;
        this.precioVenta = precioVenta;
        this.imagenesArticulo = imagenesArticulo;
        this.unidadMedida = unidadMedida;
        this.categoria = categoria;
    }
}
