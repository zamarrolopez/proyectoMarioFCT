import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosRoutingModule } from './usuarios-routing.module';



import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { UsuariosComponent } from './usuarios.component';
import { CuentaComponent } from './cuenta/cuenta.component';




@NgModule({
  declarations: [RegistroComponent, UsuariosComponent, CuentaComponent, LoginComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class UsuariosModule { }
