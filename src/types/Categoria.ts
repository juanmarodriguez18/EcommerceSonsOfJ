import { Base } from './Base';
import { Articulo } from './Articulo';

export class Categoria extends Base {
    denominacion: string;
    articulos?: Set<Articulo>;
    subCategorias?: Set<Categoria>;

    constructor(
        denominacion: string = "",
        articulos: Set<Articulo> = new Set<Articulo>(),
        subCategorias: Set<Categoria> = new Set<Categoria>()
    ) {
        super();
        this.denominacion = denominacion;
        this.articulos = articulos;
        this.subCategorias = subCategorias;
    }
}
