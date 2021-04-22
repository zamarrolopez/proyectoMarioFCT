import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CuentaComponent } from './cuenta.component';
import { PerfilComponent } from './perfil/perfil.component';
import { SeguridadComponent } from './seguridad/seguridad.component';

const routes: Routes = [
  { path: '', component: CuentaComponent, children:[
      {path: '', redirectTo: 'perfil', pathMatch: 'full' },
      {path: 'perfil', component: PerfilComponent,  pathMatch: 'full'},
      {path: 'seguridad', component: SeguridadComponent,  pathMatch: 'full'},
      {path: 'admin', component: AdminComponent, pathMatch: 'full'},
      {path: 'admin/create', component: AdminComponent, pathMatch: 'full'},
      {path: 'admin/edit/:juegoId', component: AdminComponent, pathMatch: 'full'}]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
