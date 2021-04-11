import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {path: '', redirectTo: 'cuenta/perfil', pathMatch: 'full' },
  {path: 'perfil', component: PerfilComponent,  pathMatch: 'full'},
  //{path: 'seguridad', component: PerfilComponent,  pathMatch: 'full'},
  {path: 'admin', component: AdminComponent,  pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
