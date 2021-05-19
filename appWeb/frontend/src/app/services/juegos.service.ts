import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
/**/import{map} from 'rxjs/operators';

//MODELS
import { Juego } from "src/app/models/juego.models";

//CONSTANTES
const URL = 'http://localhost:3000/api/juego/';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {
  private juegos!: Juego[];
  private juegosNombre!: Juego[];
  private juegoUpdated = new Subject<Juego[]>();
  private juegoUpdatedNombre = new Subject<Juego[]>();

  public juegoSeleccionado!: Juego;


  constructor(private http: HttpClient) {}





  /**/
  getJuegos(){
    this.http.get<{message: string, juegos: any}>(URL+ `get`)
      .pipe(map((juegoData)=>{
        return juegoData.juegos && juegoData.juegos.map((juego: { _id: any; nombre: any; descripcion:any; desarrollador: any; editor: any; genero: any; jugadores: any; duracion: any; idioma: any; lanzamiento: any; imagePath: any; puntos: any; }) =>{
          return{
            id:             juego._id,
            descripcion:    juego.descripcion,
            nombre:         juego.nombre,
            desarrollador:  juego.desarrollador,
            editor:         juego.editor,
            genero:         juego.genero,
            jugadores:      juego.jugadores,
            duracion:       juego.duracion,
            idioma:         juego.idioma,
            lanzamiento:    juego.lanzamiento,
            imagePath:      juego.imagePath,
            puntos:         juego.puntos
          };
        });
      }))
      .subscribe((transformedJuego)=>{
        this.juegos = transformedJuego;
        this.juegoUpdated.next([...this.juegos]);
      });
    }

  getJuegosNombre(){
    this.http.get<{message: string, juegos: any}>(URL+ `get/nombre`)
      .pipe(map((juegoData)=>{
        return juegoData.juegos && juegoData.juegos.map((juego: { _id: any; nombre: any; descripcion:any; desarrollador: any; editor: any; genero: any; jugadores: any; duracion: any; idioma: any; lanzamiento: any; imagePath: any; puntos:any; }) =>{
          return{
            id:             juego._id,
            descripcion:    juego.descripcion,
            nombre:         juego.nombre,
            desarrollador:  juego.desarrollador,
            editor:         juego.editor,
            genero:         juego.genero,
            jugadores:      juego.jugadores,
            duracion:       juego.duracion,
            idioma:         juego.idioma,
            lanzamiento:    juego.lanzamiento,
            imagePath:      juego.imagePath,
            puntos:         juego.puntos
          };
        });
      }))
      .subscribe((transformedJuego)=>{
        this.juegosNombre = transformedJuego;
        this.juegoUpdatedNombre.next([...this.juegosNombre]);
      });
    }

  addJuego(nombre: string, descripcion:string, desarrollador: string, editor: string, genero: string, jugadores: number, duracion: string, idioma: string, lanzamiento: string, image: File|string ){
    const juegoData = new FormData();
    juegoData.append("nombre",nombre);
    juegoData.append("descripcion",descripcion);
    juegoData.append("desarrollador",desarrollador);
    juegoData.append("editor",editor);
    juegoData.append("genero",genero);
    juegoData.append("jugadores",jugadores.toString());
    juegoData.append("duracion",duracion);
    juegoData.append("idioma",idioma);
    juegoData.append("lanzamiento",lanzamiento);
    juegoData.append("image", image, nombre);


    this.http.post<{message: string, juego:Juego}>(URL + `post`, juegoData)
    .subscribe((responseData)=>{
      const juego: Juego = {
        id:             responseData.juego.id,
        nombre:         nombre,
        descripcion:    descripcion,
        desarrollador:  desarrollador,
        editor:         editor,
        genero:         genero,
        jugadores:      jugadores,
        duracion:       duracion,
        idioma:         idioma,
        lanzamiento:    lanzamiento,
        imagePath:      responseData.juego.imagePath,
        puntos:         responseData.juego.puntos
      }
      this.juegos.push(juego);
      this.juegoUpdated.next([...this.juegos]);
    });
  }

  updateJuego(id: string, nombre: string, descripcion: string, desarrollador: string, editor: string, genero: string, jugadores: number, duracion: string, idioma: string, lanzamiento: string, image: File|string, puntos:number){
    let juegoData: Juego|FormData;
    if(typeof(image) == 'object'){
      juegoData = new FormData();
      juegoData.append("id", id);
      juegoData.append("nombre",nombre);
      juegoData.append("descripcion",descripcion);
      juegoData.append("desarrollador",desarrollador);
      juegoData.append("editor",editor);
      juegoData.append("genero",genero);
      juegoData.append("jugadores",jugadores.toString());
      juegoData.append("duracion",duracion);
      juegoData.append("idioma",idioma);
      juegoData.append("lanzamiento",lanzamiento);
      juegoData.append("image", image, nombre);
      juegoData.append("puntos", puntos.toString());
    }else{
      juegoData = {
        id:id,
        nombre:nombre,
        descripcion:descripcion,
        desarrollador:desarrollador,
        editor:editor,
        genero:genero,
        jugadores:jugadores,
        duracion:duracion,
        idioma:idioma,
        lanzamiento:lanzamiento,
        imagePath: image,
        puntos: puntos
      }
    }
    this.http.put<{message: string, juego:Juego}>(URL + `put/`+id, juegoData).subscribe(response  =>{
      const updateJuegos = [...this.juegos];
      const oldPostIndex = updateJuegos.findIndex(p=> p.id===id);
      const juego: Juego = {id:id, nombre:nombre, descripcion:descripcion, desarrollador:desarrollador, editor:editor, genero:genero, jugadores:jugadores, duracion:duracion, idioma:idioma, lanzamiento:lanzamiento, imagePath:response.juego.imagePath, puntos:puntos}
      updateJuegos[oldPostIndex] = juego;
    });
  }

  getJuegoUpdateListenetr(){
    return this.juegoUpdated.asObservable ();
  }
  getJuegoUpdateListenetrNombre(){
    return this.juegoUpdatedNombre.asObservable ();
  }

  getJuego(id: string){
    return this.http.get<{
      _id:            string,
      descripcion:    string,
      nombre:         string,
      desarrollador:  string,
      editor:         string,
      genero:         string,
      jugadores:      number,
      duracion:       string,
      idioma:         string,
      lanzamiento:    string,
      imagePath:      string,
      puntos:         number
    }>(
      URL + `get/${id}`
      );
  }

  deleteJuego(_id: string){
    this.http.delete<{message: string}>(URL + `delete/${_id}`).subscribe((res)=>{
      //Alerta
      console.log(res.message);
    });;
  }

  valorarJuego(id:string, puntos:number){return this.http.put(URL + `put/valorar/${id}`, {puntos});}


}
