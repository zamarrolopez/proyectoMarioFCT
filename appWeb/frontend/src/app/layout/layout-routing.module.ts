import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from 'src/app/layout/layout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children:[
    {path: 'dashboard', loadChildren: () => import('src/app/pages/dashboard/dashboard.module').then(m => m.DashboardModule)},
    {path: 'usuarios', loadChildren: () => import('src/app/pages/usuarios/usuarios.module').then(m => m.UsuariosModule)}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
