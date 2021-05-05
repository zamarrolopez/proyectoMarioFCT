import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;

  constructor(public authService: AuthService, public usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuario = this.authService.getUser();
    this.form = new FormGroup({
      oldPass: new FormControl(null, {validators: [Validators.required]}),
      newPass: new FormControl(null, {validators: [Validators.required]}),
      newPass2: new FormControl(null, {validators: [Validators.required]})
    });
  }

  putEmail(email:string){
    this.usuariosService.putEmail(this.usuario.id, email).subscribe(res =>{
      alert("Correo cambiado correctamente");
      this.usuario.email = email;
      this.authService.saveUser(this.usuario);
    })
  }

  putPass(){
    if(this.form.value.newPass != this.form.value.newPass2){
      this.error="Datos incorrectos";
    }else{
      this.usuariosService.putPass(this.usuario.id, this.form.value.newPass).subscribe(res =>{
        this.error="Contraseña cambiada correctamente";
        this.usuario.pass = this.form.value.newPass;
        this.authService.saveUser(this.usuario);
      });
    }
  }


}
