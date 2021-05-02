import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { PrincipalComponent } from './principal/principal.component';
import { JuegoComponent } from './juego/juego.component';




@NgModule({
  declarations: [JuegosComponent, PrincipalComponent, JuegoComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    ReactiveFormsModule
  ]
})
export class JuegosModule { }
