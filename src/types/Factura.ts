import { Base } from './Base';
import { Pedido } from './Pedido';
import { FormaPago } from './enums/FormaPago';


export class Factura extends Base {
    /*fechaFacturacion: Date;  // Puedes usar Date si prefieres manejar fechas como objetos Date
    mpPaymentId?: number;
    mpMerchantOrderId?: number;
    mpPreferenceId?: string;
    mpPaymentType?: string;
    formaPago?: FormaPago;
    totalVenta?: number;
    pedido: Pedido | undefined;*/

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        public fechaFacturacion: Date = new Date(),
        public formaPago: FormaPago,
        public totalVenta: number,
        public pedido: Pedido,
        public mpPaymentId?: number,
        public mpMerchantOrderId?: number,
        public mpPreferenceId?: string,
        public mpPaymentType?: string,
    ) {
        super(id, eliminado);
        /*this.fechaFacturacion = fechaFacturacion;
        this.mpPaymentId = mpPaymentId;
        this.mpMerchantOrderId = mpMerchantOrderId;
        this.mpPreferenceId = mpPreferenceId;
        this.mpPaymentType = mpPaymentType;
        this.formaPago = formaPago;
        this.totalVenta = totalVenta;*/
    }
}
