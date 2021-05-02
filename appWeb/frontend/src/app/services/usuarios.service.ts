import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//MODELS
import { Usuario } from 'src/app/models/usuario.models';
import { AuthService } from "src/app/services/auth.service";
//CONSTANTES
const URL = 'http://localhost:3000/api/usuario/';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private http: HttpClient, public authService: AuthService) {}

    getAll(){return this.http.get(URL + `get`);}

    getOne(id:string){
      this.http.get<{usuario: any}>(URL + `get/${id}`).subscribe(res =>{

      });
    }


    putOne(id: string, nombreU: string, pass: string, email: string, nombre: string, apellidos: string, tlf: number, numLog: number, roles: string, image: File|string ){
      let usuarioData: Usuario|FormData;
      if(typeof(image) == 'object'){
        usuarioData = new FormData();
        usuarioData.append("id", id);
        usuarioData.append("nombreU",nombreU);
        usuarioData.append("pass",pass);
        usuarioData.append("email",email);
        usuarioData.append("nombre",nombre);
        usuarioData.append("apellidos",apellidos);
        usuarioData.append("tlf",tlf.toString());
        usuarioData.append("numLog",numLog.toString());
        usuarioData.append("roles",roles);
        usuarioData.append("image", image, nombreU);
      }else{
        usuarioData = {
          id:id,
          nombreU:nombreU,
          pass:pass,
          email:email,
          nombre:nombre,
          apellidos:apellidos,
          tlf:tlf,
          numLog:numLog,
          roles:roles,
          imagePath: image
        }
      }

      this.http.put<{message: string, usuario:Usuario}>(URL + `put/${id}`, usuarioData).subscribe(response =>{
        const usuario: Usuario = {
          id:id,
          nombreU:nombreU,
          pass:pass,
          email:email,
          nombre:nombre,
          apellidos:apellidos,
          tlf:tlf,
          numLog:numLog,
          roles:roles,
          imagePath: response.usuario.imagePath
        }
        this.authService.saveUser(usuario);
        window.location.reload();
      });
    }


    putPass(id:string, pass:string){return this.http.put(URL + `put/pass/${id}`, {pass});}
    putEmail(id:string, email:string){return this.http.put(URL + `put/email/${id}`, {email});}
    putRol(id:string, roles:string){return this.http.put(URL + `put/roles/${id}`, {roles});}
}
