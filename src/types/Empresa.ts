import { Base } from './Base';
import { Sucursal } from './Sucursal';
import { ImagenEmpresa } from './ImagenEmpresa';

export class Empresa extends Base {
    nombre: string;
    razonSocial: string;
    cuil: number;
    sucursales: Sucursal[];
    imagenesEmpresa: ImagenEmpresa[];

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        nombre: string = '',
        razonSocial: string = '',
        cuil: number = 0,
        sucursales: Sucursal[] = [],
        imagenesEmpresa: ImagenEmpresa[] = []
    ) {
        super(id, eliminado);
        this.nombre = nombre;
        this.razonSocial = razonSocial;
        this.cuil = cuil;
        this.sucursales = sucursales;
        this.imagenesEmpresa = imagenesEmpresa;
    }
}
