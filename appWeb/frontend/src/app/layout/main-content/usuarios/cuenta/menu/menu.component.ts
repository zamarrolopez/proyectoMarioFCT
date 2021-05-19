import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  usuario!:Usuario;
  rango!:string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.usuario = this.authService.getUser();
    this.rango = this.usuario.roles;
  }

}
