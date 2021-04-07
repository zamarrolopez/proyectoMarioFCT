import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { CuentaComponent } from './cuenta/cuenta.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent, children:[
    {path: 'cuenta', component: CuentaComponent,  pathMatch: 'full'},
    {path: 'login', component: LoginComponent,  pathMatch: 'full'},
    {path: 'registro', component: RegistroComponent,  pathMatch: 'full'}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
