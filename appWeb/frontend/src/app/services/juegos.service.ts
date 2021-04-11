import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Juego } from "src/app/models/juego.models";
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JuegosService {
  public juegoSeleccionado!: Juego;
  private juegos!: Juego[];
  private juegos$!: Subject<Juego[]>;

  constructor(private http: HttpClient) {
    this.juegoSeleccionado = new Juego();
    this.juegos = [];  this.juegos$ = new Subject();
  }

  setJuegos(juego:Juego[]){
    this.juegos = juego;
    this.juegos$.next(this.juegos);
  }
  getJuegos$(): Observable<Juego[]>{return this.juegos$.asObservable();}





  readonly URL_API = 'http://localhost:3000/api/juego';

  //OPERACION EN EL JUEGOS /api/juego
  getJuegos(){return this.http.get(this.URL_API+"/get");}
  postJuego(juego: Juego){return this.http.post(this.URL_API + `/post/`, juego);}
  putJuego(juego: Juego){return this.http.put(this.URL_API + `/put/${juego._id}`, juego);}
  deleteJuego(_id: string){return this.http.delete(this.URL_API + `/delete/${_id}`);}

}
