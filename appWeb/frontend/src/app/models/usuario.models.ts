
export class Usuario {

    //Genero unos valores iniciales
    constructor(
        _id = "", usuario = "",
        pass="", email=""
    ){
        this._id = _id;
        this.usuario = usuario;
        this.pass = pass;
        this.email = email;
    }

    _id: string;
    usuario: string;
    pass: string;
    email: string;
}
