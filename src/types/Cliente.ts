import { Base } from './Base';
import { Domicilio } from './Domicilio';
import { ImagenCliente } from './ImagenCliente';
import { Pedido } from './Pedido';


export class Cliente extends Base {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    fechaNacimiento: string;
    domicilios: Domicilio[];
    imagenCliente: ImagenCliente;
    //usuarioCliente: UsuarioCliente;
    pedidos?: Pedido[];

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        nombre: string = '',
        apellido: string = '',
        telefono: string = '',
        email: string = '',
        fechaNacimiento: string = '',
        domicilios: Domicilio[] = [],
        imagenCliente: ImagenCliente,
        //usuarioCliente: UsuarioCliente,
        pedidos: Pedido[] = []
    ) {
        super(id, eliminado);
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.domicilios = domicilios;
        this.imagenCliente = imagenCliente;
        //this.usuarioCliente = usuarioCliente;
        this.pedidos = pedidos;
    }
}
