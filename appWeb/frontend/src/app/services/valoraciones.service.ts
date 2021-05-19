import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Valoracion } from '../models/valoracion.models';

//CONSTANTES
const URL = 'http://localhost:3000/api/valoracion/';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesService {
  private valoraciones!: Valoracion[];
  constructor(private http: HttpClient) {}


  getPuntuacionUsuario(idJuego:string, idUsuario:string){
    return this.http.get<{
    puntuacion: number
    }>(URL + `get/juego/usuario/${idJuego}/${idUsuario}`);
  }

  valorarJuego(idJuego:string, idUsuario:string, puntuacion:number){return this.http.put<{message: string}>(URL + `put/valorar`, {idJuego,idUsuario,puntuacion});}

}



