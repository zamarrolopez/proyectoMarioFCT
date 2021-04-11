import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from 'src/app/layout/layout.component';
import { HomeComponent } from './main-content/home/home.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children:[
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent,  pathMatch: 'full'},
    //{path: '', loadChildren: () => import('src/app/pages/dashboard/dashboard.module').then(m => m.DashboardModule)},
    {path: 'usuario', loadChildren: () => import('src/app/layout/main-content/usuarios/usuarios.module').then(m => m.UsuariosModule)}]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
