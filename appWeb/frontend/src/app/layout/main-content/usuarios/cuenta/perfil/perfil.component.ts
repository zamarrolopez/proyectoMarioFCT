import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usuario } from "src/app/models/usuario.models";
import { AuthService } from "src/app/services/auth.service";
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario!:Usuario;
  constructor(public authService: AuthService, public usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUser();
  }

  putPerfil(form: NgForm){
    if(form.value){
      this.usuariosService.putOne(this.usuario._id, form.value).subscribe(res =>{
        alert("Cambios guardados con exito!");
        this.authService.saveUser(this.usuario);
        window.location.reload();
      });
    }
  }
}
