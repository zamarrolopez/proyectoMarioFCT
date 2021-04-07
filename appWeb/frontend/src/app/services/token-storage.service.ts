import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
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
