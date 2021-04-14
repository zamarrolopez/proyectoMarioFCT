import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss']
})
export class CuentaComponent implements OnInit {
  info!:string;
  usuario!: Usuario;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUser();
    this.info = "Perfil de Usuario "+this.usuario.nombreU;
  }

}
