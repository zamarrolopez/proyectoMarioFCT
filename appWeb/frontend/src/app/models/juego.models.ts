
export class Juego {

    //Genero unos valores iniciales
    constructor(
        _id = "", nombre = "",
        desarrollador="", editor="" ,
        genero="", jugadores=0,
        duracion="", idioma="",
        lanzamiento="", imageUrl="",
        imageTitle="", imageDesc=""
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
        this.imageUrl       = imageUrl;
        this.imageTitle     = imageTitle;
        this.imageDesc      = imageDesc;
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
    imageUrl:       string;
    imageTitle:     string;
    imageDesc:      string;
}
