import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {mimetype} from "src/app/helpers/mime-type.validator";
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Usuario } from "src/app/models/usuario.models";
import { AuthService } from "src/app/services/auth.service";
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  form!: FormGroup;


  usuario!:Usuario;
  constructor(public authService: AuthService, public usuariosService: UsuariosService, public route:ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nombreU: new FormControl(null, {validators:[Validators.required, Validators.minLength(3)]}),
      pass: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required]}),
      nombre: new FormControl(null, {validators: [Validators.required]}),
      apellidos: new FormControl(null, {validators: [Validators.required]}),
      tlf: new FormControl(null, {validators: [Validators.required]}),
      numLog: new FormControl(null, {validators: [Validators.required]}),
      roles: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {
        validators:[Validators.required],
        asyncValidators: [mimetype]
      })
    });
    this.usuario = this.authService.getUser();

    this.form.setValue({
      nombreU:        this.usuario.nombreU,
      pass:           this.usuario.pass,
      email:          this.usuario.email,
      nombre:         this.usuario.nombre,
      apellidos:      this.usuario.apellidos,
      tlf:            this.usuario.tlf,
      numLog:         this.usuario.numLog,
      roles:          this.usuario.roles,
    //  image:          this.usuario.imagePath
    });
  }

  putPerfil(){
  /*if(){
      this.usuariosService.putOne(this.usuario._id, form.value).subscribe(res =>{
        alert("Cambios guardados con exito!");
        this.authService.saveUser(this.usuario);
        window.location.reload();
      });
    }*/
  }
}
