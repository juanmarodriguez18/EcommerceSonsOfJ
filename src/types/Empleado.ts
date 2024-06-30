import { Base } from './Base';
import { ImagenEmpleado } from './ImagenEmpleado';
import { Pedido } from './Pedido';
import { Sucursal } from './Sucursal';
import { Rol } from './enums/Rol';


export class Empleado extends Base {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    clave: string;
    fechaNacimiento: string;  // O puedes usar Date si prefieres manejar fechas como objetos Date
    tipoEmpleado: Rol;
    sucursal?: Sucursal;
    imagenEmpleado: ImagenEmpleado;
    pedidos?: Pedido[];

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        nombre: string = '',
        apellido: string = '',
        telefono: string = '',
        email: string = '',
        clave: string = '',
        fechaNacimiento: string = '',
        tipoEmpleado: Rol = Rol.EMPLEADO_COMUN,
        sucursal: Sucursal,
        imagenEmpleado: ImagenEmpleado,
        pedidos: Pedido[] = []
    ) {
        super(id, eliminado);
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.clave = clave;
        this.fechaNacimiento = fechaNacimiento;
        this.tipoEmpleado = tipoEmpleado;
        this.sucursal = sucursal;
        this.imagenEmpleado = imagenEmpleado;
        this.pedidos = pedidos;
    }
}
