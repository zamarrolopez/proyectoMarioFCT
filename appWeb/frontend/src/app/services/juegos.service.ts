import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

//MODELS
import { Juego } from "src/app/models/juego.models";
//CONSTANTES
const URL = 'http://localhost:3000/api/juego/';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {
  public juegoSeleccionado!: Juego;
  private juegos!: Juego[];
  private juegos$!: Subject<Juego[]>;

  constructor(private http: HttpClient) {
    this.juegoSeleccionado = new Juego();
    this.juegos = [];
    this.juegos$ = new Subject();
  }

  uploadFile(formData:any){return this.http.post(URL + `imagen`, formData);}



  setJuegos(juego:Juego[]){
    this.juegos = juego;
    this.juegos$.next(this.juegos);
  }
  getJuegos$(): Observable<Juego[]>{return this.juegos$.asObservable();}

  //OPERACION EN EL JUEGOS /api/juego
  getJuegos(){return this.http.get(URL+ `get`);}
  postJuego(juego: Juego){return this.http.post(URL + `post`, juego);}
  putJuego(juego: Juego){return this.http.put(URL + `put/${juego._id}`, juego);}
  deleteJuego(_id: string){return this.http.delete(URL + `delete/${_id}`);}


}
