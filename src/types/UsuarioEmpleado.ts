import { Base } from './Base';

export class UsuarioEmpleado extends Base {
    auth0Id: string;
    username: string;

    constructor(
        id: number = 0,
        eliminado: boolean = false,
        auth0Id: string = '',
        username: string = ''
    ) {
        super(id, eliminado);
        this.auth0Id = auth0Id;
        this.username = username;
    }
}
