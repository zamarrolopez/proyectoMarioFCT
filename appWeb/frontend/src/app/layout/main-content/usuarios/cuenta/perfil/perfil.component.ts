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
  public usuario!:Usuario;
  Pickedimage!: string;
  file!: File;
  form!: FormGroup;


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
      image:          this.usuario.imagePath
    });
    this.Pickedimage = this.usuario.imagePath;
  }

  putPerfil(){
    this.usuariosService.putOne(
      this.usuario.id,
      this.form.value.nombreU,
      this.form.value.pass,
      this.form.value.email,
      this.form.value.nombre,
      this.form.value.apellidos,
      this.form.value.tlf,
      this.form.value.numLog,
      this.form.value.roles,
      this.form.value.image
    );
  }



//Se encarga de cojer la imagen del input y filtrarla.
  PickedImage(event: Event){
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({image: file});
    this.form.get('image')!.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=>{
      this.Pickedimage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
