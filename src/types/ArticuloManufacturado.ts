import { Articulo } from './Articulo';
import { ArticuloManufacturadoDetalle } from './ArticuloManufacturadoDetalle';
import { Categoria } from './Categoria';
import { ImagenArticulo } from './ImagenArticulo';
import { UnidadMedida } from './UnidadMedida';

// Definición de la clase ArticuloManufacturado extendiendo de Articulo
export class ArticuloManufacturado extends Articulo {
    descripcion: string;
    tiempoEstimadoMinutos: number;
    preparacion: string;
    articuloManufacturadoDetalles: Set<ArticuloManufacturadoDetalle>;

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        denominacion: string = '',
        precioVenta: number = 0.0,
        imagenesArticulo: Set<ImagenArticulo> = new Set(),
        unidadMedida: UnidadMedida = new UnidadMedida(),
        categoria: Categoria,
        descripcion: string = '',
        tiempoEstimadoMinutos: number = 0,
        preparacion: string = '',
        articuloManufacturadoDetalles: Set<ArticuloManufacturadoDetalle> = new Set()
    ) {
        super(id, eliminado, denominacion, precioVenta, imagenesArticulo, unidadMedida, categoria);
        this.descripcion = descripcion;
        this.tiempoEstimadoMinutos = tiempoEstimadoMinutos;
        this.preparacion = preparacion;
        this.articuloManufacturadoDetalles = articuloManufacturadoDetalles;
    }
}
