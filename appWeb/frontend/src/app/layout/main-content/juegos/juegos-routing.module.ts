import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JuegoComponent } from './juego/juego.component';
import { JuegosComponent } from './juegos.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  { path: '', component: JuegosComponent, children:[
    {path: '', redirectTo: 'principal', pathMatch: 'full' },
    {path: 'principal', component: PrincipalComponent,  pathMatch: 'full'},
    {path: 'juego/:id', component: JuegoComponent,  pathMatch: 'full'}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
