import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/usuarios/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(nombre: string, pass: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {nombre,pass}, httpOptions);}

  registro(nombre: string, correo: string, pass: string): Observable<any> {
    return this.http.post(AUTH_API + 'registro', {nombre,correo,pass}, httpOptions);}

}
