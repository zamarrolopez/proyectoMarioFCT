
export class Juego {

    //Genero unos valores iniciales
    constructor(
        _id = "", nombre = "",
        desarrollador="", editor="" ,
        genero="", jugadores=0,
        duracion="", idioma="",
        lanzamiento=""
    ){
        this._id            = _id;
        this.nombre         = nombre;
        this.desarrollador  = desarrollador;
        this.editor         = editor;
        this.genero         = genero;
        this.jugadores      = jugadores;
        this.duracion       = duracion;
        this.idioma         = idioma;
        this.lanzamiento    = lanzamiento;
    }

    _id:            string;
    nombre:         string;
    desarrollador:  string;
    editor:         string;
    genero:         string;
    jugadores:      number;
    duracion:       string;
    idioma:         string;
    lanzamiento:    string;
}
