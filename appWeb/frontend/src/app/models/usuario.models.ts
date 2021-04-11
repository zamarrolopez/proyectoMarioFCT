
export class Usuario {

    //Genero unos valores iniciales
    constructor(
        _id = "", nombreU = "",
        pass="", email="" ,
        nombre="", apellidos="",
        tlf=0, roles=""
    ){
        this._id        = _id;
        this.nombreU    = nombreU;
        this.pass       = pass;
        this.email      = email;
        this.nombre     = nombre;
        this.apellidos  = apellidos;
        this.tlf        = tlf;
        this.roles      = roles;
    }

    _id:        string;
    nombreU:    string;
    pass:       string;
    email:      string;
    nombre:     string;
    apellidos:  string;
    tlf:        number;
    roles:      string;
}
