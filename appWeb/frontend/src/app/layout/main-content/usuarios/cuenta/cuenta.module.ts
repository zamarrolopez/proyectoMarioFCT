import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaRoutingModule } from './cuenta-routing.module';
import { CuentaComponent } from './cuenta.component';

import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdminComponent } from './admin/admin.component';

import { LayoutModule } from 'src/app/layout/layout.module';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { ListaCrearJuegoComponent } from 'src/app/shared-component/lista-crear-juego/lista-crear-juego.component';




@NgModule({
  declarations: [CuentaComponent, MenuComponent, PerfilComponent, AdminComponent, ListaCrearJuegoComponent, SeguridadComponent],
  imports: [
    CuentaRoutingModule,
    CommonModule,
    LayoutModule
  ]
})
export class CuentaModule { }
