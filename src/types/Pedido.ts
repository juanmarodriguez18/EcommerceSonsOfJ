import { Base } from './Base';
import { TipoEnvio } from './enums/TipoEnvio';
import { Domicilio } from './Domicilio';
import { Empleado } from './Empleado';
import { Cliente } from './Cliente';
import { Estado } from './enums/Estado';
import { FormaPago } from './enums/FormaPago';
import { Sucursal } from './Sucursal';
import { PedidoDetalle } from './PedidoDetalle';

export class Pedido extends Base {
    horaEstimadaFinalizacion: Date;
    total: number;
    totalCosto: number;
    estado: Estado;
    tipoEnvio: TipoEnvio;
    formaPago: FormaPago;
    fechaPedido: Date;
    sucursal: Sucursal;
    domicilio: Domicilio;
    empleado: Empleado;
    pedidoDetalles: PedidoDetalle[];
    cliente: Cliente;

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        horaEstimadaFinalizacion: Date = new Date(),
        total: number = 0,
        totalCosto: number = 0,
        estado: Estado,
        tipoEnvio: TipoEnvio,
        formaPago: FormaPago,
        fechaPedido: Date = new Date(),
        sucursal: Sucursal,
        domicilio: Domicilio,
        empleado: Empleado,
        pedidoDetalles: PedidoDetalle[] = [],
        cliente: Cliente,
    ) {
        super(id, eliminado);
        this.horaEstimadaFinalizacion = horaEstimadaFinalizacion;
        this.total = total;
        this.totalCosto = totalCosto;
        this.estado = estado;
        this.tipoEnvio = tipoEnvio;
        this.formaPago = formaPago;
        this.fechaPedido = fechaPedido;
        this.sucursal = sucursal;
        this.domicilio = domicilio;
        this.empleado = empleado;
        this.pedidoDetalles = pedidoDetalles;
        this.cliente = cliente;
    }
}
