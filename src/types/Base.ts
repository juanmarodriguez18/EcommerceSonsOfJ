export abstract class Base {
    public id: number;
    public eliminado: boolean;

    constructor(id: number = 0, eliminado: boolean = false) {
        this.id = id;
        this.eliminado = eliminado;
    }
}