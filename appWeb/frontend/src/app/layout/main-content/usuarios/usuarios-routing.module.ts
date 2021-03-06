import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuariosComponent } from './usuarios.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent, children:[
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'cuenta', loadChildren: () => import('src/app/layout/main-content/usuarios/cuenta/cuenta.module').then(m => m.CuentaModule)},
    {path: 'login', component: LoginComponent,  pathMatch: 'full'},
    {path: 'registro', component: RegistroComponent,  pathMatch: 'full'}]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
