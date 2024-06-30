import { Base } from './Base';

export class ImagenCliente extends Base {
    url: string;

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        url: string = ''
    ) {
        super(id, eliminado);
        this.url = url;
    }
}
