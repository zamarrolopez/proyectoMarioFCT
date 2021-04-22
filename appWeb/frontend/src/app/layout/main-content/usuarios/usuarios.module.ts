import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ROUTING
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { LayoutModule } from '../../layout.module';
//Componentes
import { UsuariosComponent } from './usuarios.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
//Interceptro
import { authInterceptorProviders } from 'src/app/helpers/auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UsuariosComponent, LoginComponent, RegistroComponent],
  imports: [
    UsuariosRoutingModule,
    CommonModule,
    LayoutModule,
    ReactiveFormsModule

  ],
  providers: [authInterceptorProviders],
})

export class UsuariosModule { }
