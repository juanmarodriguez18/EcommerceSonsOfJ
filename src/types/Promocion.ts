import { Base } from './Base';
import { ImagenPromocion } from './ImagenPromocion';
import { PromocionDetalle } from './PromocionDetalle';
import { Sucursal } from './Sucursal';
import { TipoPromocion } from './enums/TipoPromocion';


export class Promocion extends Base {
    denominacion: string;
    fechaDesde: Date;
    fechaHasta: Date;
    horaDesde: Date;
    horaHasta: Date;
    descripcionDescuento: string;
    precioPromocional: number;
    tipoPromocion: TipoPromocion;
    imagenesPromocion: ImagenPromocion[];
    sucursales: Sucursal[];
    promocionDetalles: PromocionDetalle[];

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        denominacion: string = '',
        fechaDesde: Date = new Date(),
        fechaHasta: Date = new Date(),
        horaDesde: Date = new Date(),
        horaHasta: Date = new Date(),
        descripcionDescuento: string = '',
        precioPromocional: number = 0,
        tipoPromocion: TipoPromocion,
        imagenesPromocion: ImagenPromocion[] = [],
        sucursales: Sucursal[] = [],
        promocionDetalles: PromocionDetalle[] = []
    ) {
        super(id, eliminado);
        this.denominacion = denominacion;
        this.fechaDesde = fechaDesde;
        this.fechaHasta = fechaHasta;
        this.horaDesde = horaDesde;
        this.horaHasta = horaHasta;
        this.descripcionDescuento = descripcionDescuento;
        this.precioPromocional = precioPromocional;
        this.tipoPromocion = tipoPromocion;
        this.imagenesPromocion = imagenesPromocion;
        this.sucursales = sucursales;
        this.promocionDetalles = promocionDetalles;
    }
}
