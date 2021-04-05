import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { UsuariosComponent } from './usuarios.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent, RegistroComponent, UsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule

  ]
})
export class UsuariosModule { }
