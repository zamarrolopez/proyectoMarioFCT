import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,Subject } from 'rxjs';
//models
import { Usuario } from 'src/app/models/usuario.models';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const AUTH_API = 'http://localhost:3000/api/usuario/';
const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({providedIn: 'root'})

export class AuthService {
  constructor(private http: HttpClient) {}
  private authStatus = new Subject<boolean>();

  getAuthStatus() {return this.authStatus.asObservable();}
  setAuthStatus() {this.authStatus.next(true);}

  //LOGIN Y REGISTRO
  login(nombreU: string, pass: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {nombreU,pass}, httpOptions);
  }

  registro(nombreU: string, email: string, pass: string): Observable<any> {
    return this.http.post(AUTH_API + 'registro', {nombreU,email,pass}, httpOptions);
  }

  //Perfil y seguridad
  editar(id:string, usuario:Usuario){
    return this.http.put(AUTH_API + `put/${id}`, usuario);
  }

  putPass(){

  }

  putEmail(id:string, email:string){
    return this.http.put(AUTH_API + `email/put/${id}`, {email});
  }


  //STORAGE AUTENTIFICACION----------
  public signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(usuario: Usuario): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(usuario));
  }

  public getUser(): any {
    const usuario = window.sessionStorage.getItem(USER_KEY);
    if (usuario) {
      return JSON.parse(usuario);
    }
    return {};
  }

}
