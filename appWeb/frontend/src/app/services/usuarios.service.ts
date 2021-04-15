import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//MODELS
import { Usuario } from 'src/app/models/usuario.models';
//CONSTANTES
const URL = 'http://localhost:3000/api/usuario/';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private http: HttpClient) {}
    getAll(){return this.http.get(URL + `get`);}
    getOne(id:string){return this.http.get(URL + `get/${id}`);}
    putOne(id:string, usuario:Usuario){return this.http.put(URL + `put/${id}`, usuario);}
    putPass(id:string, pass:string){return this.http.put(URL + `put/pass/${id}`, {pass});}
    putEmail(id:string, email:string){return this.http.put(URL + `put/email/${id}`, {email});}
    putRol(id:string, roles:string){return this.http.put(URL + `put/roles/${id}`, {roles});}
}
