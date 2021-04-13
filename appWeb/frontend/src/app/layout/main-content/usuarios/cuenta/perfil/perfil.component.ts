import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usuario } from "src/app/models/usuario.models";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario!:Usuario;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUser();
  }

  editarCuenta(form: NgForm){
    if(form.value){
      this.authService.editar(this.usuario._id, form.value).subscribe(res =>{
        alert("Cambios guardados con exito!");
        this.authService.saveUser(this.usuario);
        window.location.reload();
      })
    }
  }
}
