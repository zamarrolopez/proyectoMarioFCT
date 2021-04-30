import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.models';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.scss']
})
export class SeguridadComponent implements OnInit {
  usuario!:Usuario;
  error = "";
  constructor(public authService: AuthService, public usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUser();
  }

  putEmail(email:string){
    this.usuariosService.putEmail(this.usuario.id, email).subscribe(res =>{
      alert("Correo cambiado correctamente");
      this.usuario.email = email;
      this.authService.saveUser(this.usuario);
    })
  }

  putPass(form:NgForm){
    if(form.value.oldPass != this.usuario.pass){
      this.error="Datos incorrectos";
    }else{
      if(form.value.newPass != form.value.newPass2){
        this.error="Datos incorrectos";
      }else{
        this.usuariosService.putPass(this.usuario.id, form.value.newPass).subscribe(res =>{
          alert("Contraseña cambiada correctamente");
          this.usuario.pass = form.value.newPass;
          this.authService.saveUser(this.usuario);
        });
      }
    }
  }


}
